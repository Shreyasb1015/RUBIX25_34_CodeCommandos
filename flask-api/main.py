import re
from flask import Flask, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os
import chromadb
from chromadb.config import Settings
from flask_cors import CORS



chroma_client = chromadb.PersistentClient(path="./user_data")
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
collection = chroma_client.get_or_create_collection(name="database_users")


client = Groq(api_key=GROQ_API_KEY)
app = Flask(__name__)
CORS(app,supports_credentials=True)



PROMPT_TEMPLATE = """
You are the official chatbot of HackVishwa, a virtual hackathon platform where users can:
- Participate in hackathons with their friends.
- Find teammates with similar skills and interests to collaborate in hackathons.
- Compete, win, and level up through five levels:
  1. Beginner: Participate in 1 hackathon.
  2. Intermediate: Win 1 hackathon.
  3. Pro: Participate in 10 hackathons.
  4. Master: Win 3 hackathons.
  5. Legend: Win 5 hackathons.
- Organizers can create hackathons, and automatic group chats are formed for participants in the same hackathon for Q&A or doubt sessions.
- AI is used in judging to:
  - Generate code summaries.
  - Identify pros and cons of submitted GitHub projects.
  - Provide scores out of 10 based on predefined criteria, helping judges with quick assessments.
- The platform supports multiple Indian languages like Hindi, Marathi, Bengali, Tamil, and more.
- Users can switch between light and dark themes for a personalized experience.

As the HackVishwa chatbot:
- You will answer user queries about HackVishwa's features, hackathons, and tips for participating or winning hackathons.
- If a user asks about unrelated topics, respond with: 
  "I am the chatbot of HackVishwa, here to assist with hackathon-related queries only."
- Provide actionable, concise, and relevant answers.
- Share useful tips for hackathon success if users inquire.

Answer the following user question based on the information above and brief answers:
"""


CLEANUP_PATTERN = r"(\n{2,}|\s{2,})|(\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b)|[^a-zA-Z0-9\s.,!?]"  # Adjust this regex as needed


@app.route('/query', methods=['POST'])
def handle_query():
    user_input = request.json.get("user_input", "")


    if not user_input:
        return jsonify({"error": "No user input provided."}), 400

 
    response = client.chat.completions.create(
        messages=[{"role": "system", "content": PROMPT_TEMPLATE},
                  {"role": "user", "content": user_input}],
        model="llama3-8b-8192"
    )

   
    ai_response = response.choices[0].message.content


    cleaned_response = re.sub(CLEANUP_PATTERN, ' ', ai_response).strip()

    return jsonify({"response": cleaned_response})

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    username = data.get("username")
    user_email = data.get("user_email", "")
    user_id = data.get("user_id")
    skills = data.get("skills", [])
    interests = data.get("interests", [])
    collection = chroma_client.get_or_create_collection(name="my_database_user")
    print(chroma_client.list_collections())

    if not username or not user_id:
        return jsonify({"error": "Username and User ID are required."}), 400

  
    try:
        existing_user = collection.get(ids=[user_id])
        if existing_user and existing_user['documents']:
            return jsonify({"error": "User ID already exists"}), 409
    except Exception as e:
       return jsonify({"error": f"Database error: {str(e)}"}), 500

    document_text = f"Username: {username} User ID: {user_id} Email: {user_email} Skills: {', '.join(skills)} Interests: {', '.join(interests)}"

    collection.upsert(
        documents=[document_text], 
        metadatas=[{
            "username": username,
            "user_id": user_id,
            "email": user_email,
            "skills": skills,
            "interests": interests
        }],
        ids=[user_id]
    )
    
    return jsonify({"message": "User added successfully."}), 201

@app.route('/fetch_relevant_users', methods=['POST'])
def fetch_relevant_users():
    data = request.json
    skills = data.get("skills", [])
    interests = data.get("interests", [])
    collection = chroma_client.get_or_create_collection(name="my_database_user")
    print(chroma_client.list_collections())

    if not skills and not interests:
        return jsonify({"error": "At least one skill or interest must be provided."}), 400

    query_texts = []
    
    if skills:
        query_texts.append(f"Skills: {', '.join(skills)}")
    
    if interests:
        query_texts.append(f"Interests: {', '.join(interests)}")

    results = collection.query(
        query_texts=query_texts,
        n_results=5 ,
        include=["metadatas"]
    )

    return jsonify({"relevant_users": results}), 200

if __name__ == "__main__":
    app.run(debug=True)
