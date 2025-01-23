import re
from flask import Flask, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os
import chromadb
from chromadb.config import Settings
from flask_cors import CORS
import requests
import base64


chroma_client = chromadb.PersistentClient(path="./user_data")
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GITHUB_ACCESS_TOKEN = os.getenv("GITHUB_ACCESS_TOKEN")
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
        ids=[user_id]
    )
    
    return jsonify({"message": "User added successfully."}), 201

@app.route('/fetch_relevant_users', methods=['POST'])
def fetch_relevant_users():
    data = request.json
    interests = data.get("interests", [])
    collection = chroma_client.get_or_create_collection(name="my_database_user")
    print(chroma_client.list_collections())

    if not interests:
        return jsonify({"error": "At least one skill or interest must be provided."}), 400

    query_texts = []
    
    if interests:
        query_texts.append(f"Interests: {', '.join(interests)}")

    results = collection.query(
        query_texts=query_texts,
        n_results=5 ,
    )

    return jsonify({"relevant_users": results}), 200


def get_repo_metrics(owner, repo_name, headers):
    base_url = f'https://api.github.com/repos/{owner}/{repo_name}'
    
    commits = requests.get(f'{base_url}/commits', headers=headers).json()
    pulls = requests.get(f'{base_url}/pulls?state=all', headers=headers).json()
    issues = requests.get(f'{base_url}/issues?state=all', headers=headers).json()
    
    return {
        'total_commits': len(commits) if isinstance(commits, list) else 0,
        'total_prs': len(pulls) if isinstance(pulls, list) else 0,
        'total_issues': len(issues) if isinstance(issues, list) else 0
    }

def create_judge_prompt(repo_data, metrics):
    return f"""
    You are an experienced hackathon judge evaluating a project. Analyze this submission based on:

    Project Info:
    - Name: {repo_data['name']}
    - Description: {repo_data['description']}
    - Primary Language: {repo_data['language']}
    - Technologies: {repo_data['files'].get('package.json', 'Not available')}
    
    Repository Metrics:
    - Stars: {repo_data['stars']}
    - Forks: {repo_data['forks']}
    - Total Commits: {metrics['total_commits']}
    - Pull Requests: {metrics['total_prs']}
    - Issues: {metrics['total_issues']}
    
    Documentation:
    {repo_data['files'].get('README.md', 'No README available')}

    Provide a structured analysis:
    1. Project Overview (2-3 sentences)
    2. Top 2 Strengths
    3. Top 2 Areas for Improvement
    4. Technical Implementation Score (1-10)
    5. Innovation Score (1-10)
    6. Documentation Score (1-10)
    7. Overall Score (1-10)
    8. Final Verdict (2-3 sentences)

    Format your response in a clear, structured manner.
    """

@app.route('/fetch_repo_details', methods=['POST'])
def fetch_repo_details():
    data = request.json
    repo_url = data.get("repo_url", "")

    if not repo_url:
        return jsonify({"error": "No repository URL provided."}), 400

   
    try:
        repo_path = repo_url.split("github.com/")[1].strip().rstrip("/")
        owner, repo_name = repo_path.split("/")
    except IndexError:
        return jsonify({"error": "Invalid repository URL."}), 400

  
    github_api_url = f"https://api.github.com/repos/{owner}/{repo_name}"


    headers = {
        "Authorization": f"token {GITHUB_ACCESS_TOKEN}", 
    }


    response = requests.get(github_api_url, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch repository details from GitHub."}), response.status_code

    repo_details = response.json()

  
    code_summary_prompt = f"Summarize the code in the repository '{repo_name}' owned by '{owner}'."
    
   
    try:
        summary_response = client.chat.completions.create(
            messages=[
                      {"role": "user", "content": code_summary_prompt}],
            model="llama3-8b-8192"
        )

        code_summary = summary_response.choices[0].message.content
        
        return jsonify({
            "repository_name": repo_name,
            "owner": owner,
            "description": repo_details.get("description"),
            "stars": repo_details.get("stargazers_count"),
            "forks": repo_details.get("forks_count"),
            "summary": code_summary,
        }), 200

    except Exception as e:
        return jsonify({"error": f"Error while analyzing the repository: {str(e)}"}), 500



def get_repo_data(owner, repo_name, access_token):
    headers = {
        'Authorization': f'token {access_token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    try:
      
        repo_url = f'https://api.github.com/repos/{owner}/{repo_name}'
        repo_response = requests.get(repo_url, headers=headers)
        repo_response.raise_for_status()
        repo_data = repo_response.json()
        
      
        contents_url = f'https://api.github.com/repos/{owner}/{repo_name}/contents'
        contents_response = requests.get(contents_url, headers=headers)
        contents_response.raise_for_status()
        contents = contents_response.json()
        
        
        files_data = {}
        for item in contents:
            if isinstance(item, dict) and item.get('type') == 'file':
                if item['name'] in ['package.json', 'README.md']:
                    file_response = requests.get(item['download_url'], headers=headers)
                    file_response.raise_for_status()
                    files_data[item['name']] = file_response.text
        
        return {
            'name': repo_data.get('name'),
            'description': repo_data.get('description'),
            'language': repo_data.get('language'),
            'stars': repo_data.get('stargazers_count'),
            'forks': repo_data.get('forks_count'),
            'files': files_data
        }
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"GitHub API error: {str(e)}")

def extract_github_info(github_url):
   
    try:
      
        github_url = github_url.strip()
        if github_url.endswith('/'):
            github_url = github_url[:-1]
            
       
        if 'github.com' in github_url:
            
            if '://' in github_url:
                github_url = github_url.split('://')[1]
                
            parts = github_url.split('/')
            github_index = parts.index('github.com')
            
            if len(parts) > github_index + 2:
                owner = parts[github_index + 1]
                repo_name = parts[github_index + 2].split('.git')[0]  # Remove .git if present
                return owner, repo_name
                
        raise ValueError("Invalid GitHub URL format. Expected: github.com/owner/repo")
        
    except Exception as e:
        raise ValueError(f"Could not parse GitHub URL: {str(e)}")
    
def extract_analysis_sections(text):
    
    analysis = {
        
        'overview': '',
        'strengths': [],
        'improvements': [],
        'scores': {
            'technical': 0,
            'innovation': 0,
            'documentation': 0,
            'overall': 0
        },
        'verdict': ''
    }
    
    sections = text.split('\n')
    current_section = None
    
    for line in text.split('\n'):
        line = line.strip()
        if not line:
            continue
            
        
        if "Project Overview" in line:
            current_section = 'overview'
        elif "Top 2 Strengths" in line:
            current_section = 'strengths'
        elif "Areas for Improvement" in line:
            current_section = 'improvements'
        elif "Technical Implementation Score" in line:
            score = line.split('(')[1].split('/')[0]
            analysis['scores']['technical'] = int(score)
        elif "Innovation Score" in line:
            score = line.split('(')[1].split('/')[0]
            analysis['scores']['innovation'] = int(score)
        elif "Documentation Score" in line:
            score = line.split('(')[1].split('/')[0]
            analysis['scores']['documentation'] = int(score)
        elif "Overall Score" in line:
            score = line.split('(')[1].split('/')[0]
            analysis['scores']['overall'] = float(score)
        elif "Final Verdict" in line:
            current_section = 'verdict'
        elif current_section:
            
            clean_line = line.strip('* ')
            if current_section == 'overview':
                analysis['overview'] += clean_line + ' '
            elif current_section == 'strengths' and ('1.' in line or '2.' in line):
                analysis['strengths'].append(clean_line)
            elif current_section == 'improvements' and ('1.' in line or '2.' in line):
                analysis['improvements'].append(clean_line)
            elif current_section == 'verdict':
                analysis['verdict'] += clean_line + ' '
    
    return {k: v.strip() if isinstance(v, str) else v for k, v in analysis.items()}


@app.route('/analyze-repo', methods=['POST'])
def analyze_repository():
    github_url = request.json.get("github_url", "").strip()
    
    if not github_url:
        return jsonify({"error": "GitHub URL is required"}), 400
        
    try:
        owner, repo_name = extract_github_info(github_url)
        headers = {
            'Authorization': f'token {GITHUB_ACCESS_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        
        repo_data = get_repo_data(owner, repo_name, GITHUB_ACCESS_TOKEN)
        metrics = get_repo_metrics(owner, repo_name, headers)
        
        judge_prompt = create_judge_prompt(repo_data, metrics)
        
        analysis_response = client.chat.completions.create(
            messages=[{"role": "system", "content": judge_prompt}],
            model="llama3-8b-8192",
            temperature=0.7
        )
        
        analysis_text = analysis_response.choices[0].message.content
        structured_analysis = extract_analysis_sections(analysis_text)
        return jsonify({
            "repository_info": repo_data,
            "metrics": metrics,
            "analysis": structured_analysis
        }), 200
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"GitHub API error: {str(e)}"}), 500
    
    
if __name__ == "__main__":
    app.run(debug=True)
