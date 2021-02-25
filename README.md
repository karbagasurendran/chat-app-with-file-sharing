# chat-app-with-file-sharing
<blockquote> ionic_angular chat app using express,mongodb Atlas, socket.io & mongoose  </blockquote>

<h1>chat Room<h1>
<img src="chatapp.png" alt="Paris" class="center" />
<h3>Requirements</h3>  

- Install Node js </a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>

- Ionic client <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Ionic_Logo.svg" alt="ionic" width="40" height="40"/>
<pre><code><span class="token prompt">$ </span><span class="token function">npm</span> <span class="token function">install</span> -g @ionic/cli</code></pre>

- Nodemon

<pre><code><span class="token prompt">$ </span><span class="token function">npm</span> <span class="token function">install</span> -g nodemon</code></pre>

<h3>Installing Steps:</h3>

 - download file
 - create <b> mychat folder </b> & paste the downloading files <b>inside</b> the folder.
 - open command prompt or terminal.
 - install dependency so enter command 
 <pre><code><span class="token prompt">$ </span><span class="token function">cd</span> <span class="token function">mychat</span></code></pre>
 
 <pre><code><span class="token prompt">$ </span><span class="token function">npm</span> <span class="token function">install</span></code></pre>
<b>Next</b>
 - install express dependencies
 <pre><code><span class="token prompt">$ </span><span class="token function">cd</span> <span class="token function">backend</span></code></pre>
 
<pre><code><span class="token prompt">$ </span><span class="token function">npm</span> <span class="token function">install</span></code></pre>

- Then create mongodb atlas account & and create your own database.
  more infromation <link> https://docs.atlas.mongodb.com/connect-to-cluster/ </link>

- Open <b> db.js </b>(mychat/backend/database/db.js) file on your code editor and paste the your mongoDb atlas cluster link on the file.
- finally save the file.
- first start your express server so goto <b>backend</b> folder directory.
- run following command in command prompt or terminal
 <pre><code><span class="token prompt">$ </span><span class="token function">nodemon</span> <span class="token function">serve</span></code></pre>
 
 - open another command prompt or terminal(don't close previous command prompt or terminal)
 - start ionic app so go to <b> mychat</b> folder directory in command prompt
 - - run following command in command prompt or terminal
 <pre><code><span class="token prompt">$ </span><span class="token function">ionic</span> <span class="token function">serve</span></code></pre>
 
- That's all your ionic chat app is successfully build....
