# Justice for Ugly Animals
Welcome to the repository of the [Justice for Ugly Animals](https://justice-for-ugly-animals.vercel.app/). JfUA is a forum of people
that think that eating vegetables of weird shapes is ok, that it is ok to have pimples and most importantly, it is ok for animals to be ugly.

# 🔧 The stack
**MongoDB** or more specifically - Mongoose

**Express**

**React** with Tailwind CSS

**Node.js**

# 🏃 How to run locally
1. Clone the repository.
``` bash
git clone https://github.com/rienath/Justice-for-Ugly-Animals.git
```
2. Set the environmental variables using [the example file](server/.env.example) (do not forget to remove *.example* from the end).
3. Comment [this line](https://github.com/rienath/Justice-for-Ugly-Animals/blob/600ec0411adeb81a7993551b410f06d474061ab7/client/src/api/index.js#L4),
uncomment [this line](https://github.com/rienath/Justice-for-Ugly-Animals/blob/600ec0411adeb81a7993551b410f06d474061ab7/client/src/api/index.js#L3).
5.  Run backend.
``` bash
cd server
npm install
npm start
```
4. Run frontend (in a different console window).
``` bash
cd client
npm install
npm start
```

# 🏗️ Folder structure 
``` bash
.
├── client                    # Frontend
│   ├── package.json          # npm packages
│   ├── postcss.config.js     # Tailwind configurations
│   ├── public                # React public folder
│   ├── src                   # All the important files
│   │   ├── App.js            # App component
│   │   ├── api               # The backend calls
│   │   ├── components        # React components
│   │   ├── images            # Images used
│   │   ├── index.css         # CSS configurations
│   │   └── index.js          # Frontend entry point
│   └── tailwind.config.js    # Tailwind configurations
└── server                    # Backend
    ├── controllers           # All controllers
    ├── index.js              # Backend entry point
    ├── middleware            # All middlewares
    ├── models                # Mongoose models
    ├── package.json          # npm packages
    └── routes                # Routers
```
