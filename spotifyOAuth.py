from flask import Flask, redirect, request, session, url_for, jsonify
import requests

app = Flask(__name__)


CLIENT_ID = 'a9133a4606a74919aefcc1c43f11247e'
CLIENT_SECRET = '309db053956c4d32ad3ad229c96ac24c'
REDIRECT_URI = 'http://localhost:5000/callback'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
SCOPES = 'user-read-private user-read-email'


@app.route('/login')
def login():

    auth_url = (
        f"https://accounts.spotify.com/authorize"
        f"?client_id={CLIENT_ID}"
        f"&response_type=code"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope={SCOPES}"
        f"&show_dialog=true"
    )
    
    return redirect(auth_url)

@app.route('/callback')
def callback():

    if 'error' in request.args:
        return jsonify({"error":request.args["error"]})

    if 'code' in request.args:
        req_body = {
            'code' : request.args['code'], 
            'grant_type' : 'authorization_code', 
            'redirect_uri' : REDIRECT_URI, 
            'client_id' : CLIENT_ID, 
            'client_secrect' : CLIENT_SECRET 
        }
    
    response = request.post(TOKEN_URL,data=req_body)
    token_info = response.json()

    session['access_token'] = token_info["access_token"]
    session['refresh_token'] = token_info["refresh_token"]
    

    return redirect('/add')


@app.route('/add')
def add():
    access_token = session.get('access_token')
    if not access_token:
        return redirect('/login')

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get('https://api.spotify.com/v1/me/playlists', headers=headers)
    
    if response.status_code != 200:
        return 'Error: Failed to fetch profile.'

    user_data = response.json()
    return jsonify(user_data)

if __name__ == '__main__':
    app.run(debug=True)