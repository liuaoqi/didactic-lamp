const express = require('express');
const app = express();
const log = console.log;
const path = require('path');
const { User } = require('./models/user');
const { Ratings } = require('./models/ratings');
const { Survey } = require('./models/survey');
const {Resources} = require('./models/resources')
const { mongoose } = require('./db/mongoose');
const { ObjectID, MongoError } = require('mongodb');
const bodyParser = require('body-parser');
const session = require('express-session');

mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'memoria/build')));

app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 60000,
      httpOnly: true
  }
}));

const mongoChecker = (req, res, next) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} else {
		next()
	}	
}

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
      res.status(200).send(req.session.user)
  } else {
      res.status(401).send("User unauthorized")
      next();
  }   
};

app.post('/api/createaccount', function(req, res) {
  const { email, password, region, name, username } = req.body;
  const rating = ""
  const admin = false
  const journalEntries = []
  const user = new User({ email, password, region, name, username, rating, admin, journalEntries});
  user.save().then((user) => {
    res.status(200).send(user)
  }).catch((error) => {
    if (error instanceof MongoError) {
      log(error)
      if (error.code === 11000) {
        if (error.keyValue["username"]) {
          res.status(401).send("That username is taken")
        }
        else if (error.keyValue["email"]) {
          res.status(401).send("That email address is taken.")
        }
        else {
          res.status(500).send("Something went wrong creating your account. Please try again.")
        }
      }
      else {
        res.status(500).send("Something went wrong creating your account. Please try again.")
      }
    } 
  });
});

app.post('/api/login', mongoChecker, (req, res) => {
	const {username, password} = req.body
	User.findByUsernamePassword(username, password).then((user) => {
	    if (!user) {
          res.status(401).send("User not found.")
        } else {
            req.session.user = user;
            res.status(200).send(user)
        }
    }).catch((error) => {
        log(error)
        if (error == "incorrect password") {
          res.status(401).send("Incorrect password!")
        }
        else if (error == "user not found") {
          res.status(401).send("There is no user with that username!")
        }
        else {
          log(error)
          res.status(500).send("There was an error!");
        }
    })
});

app.post('/api/updateUserRating', function(req, res) {
  const {rating, username} = req.body;
   User.findOne({ username: username }).then((user) => {
     if (!user) {
       res.status(401).send("There was an error, user was not found.")
     } else {
       user.rating = rating
       user.save().then((user) => {
         req.session.user = user;
         res.status(200).send(user)
       })
     }
   }).catch((error) => {
     log(error)
     res.status(500).send("Something went wrong updating your rating. Please try again.")
   })
})


app.post('/api/updateRatings', function(req, res) {
    // Update the corresponding mood rating field
  const {region, q6} = req.body
  Ratings.findOne({location: region}).then((rating) => {
    if (!rating) {
      res.status(400).send("Region not found.")
    } else {
      // Calculate the average rating
      const numOfRatings = parseInt(rating.numOfRatings, 10)
      const oldRating = parseInt(rating.ratings, 10)
      // Update the average rating
      rating.ratings = (parseInt(q6, 10) + (oldRating * numOfRatings))/(numOfRatings + 1).toFixed(2)
      // Update the rating counter
      rating.numOfRatings = numOfRatings + 1
      const updatesRating = new Ratings(rating)
      updatesRating.save().then((rating) => {
        res.status(200).send(rating)
      }).catch((error) => {
        log(error)
        res.status(500).send("There was an error updating the ratings.")
      })
    }
  }).catch((error) => {
    log(error)
    res.status(500).send("There was an error updating the ratings.")
  });
})

// Update mood ratings
app.post('/api/surveysubmit', function(req, res) {

  // Add new survey to the database
  const { q1, q2, q3, q4, q5, q6, region } = req.body;
  const survey = new Survey({ q1, q2, q3, q4, q5, q6, region });
  survey.save().then((survey) => {
    res.status(200).send(survey)
  }).catch((error) => {
      log(error)
      res.status(500).send("Something went wrong sending the survey. Please try again.")
  });
})

app.get('/api/logout', function(req, res) {
  req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.status(200).send()
		}
	})
})

app.get('/api/sessionChecker', sessionChecker, function(req, res) {
  res.status(200).send()
});
   
//Get Journal Entries from user 
app.post('/api/getprofile', (req,res) => {

  User.find({
    username: req.body.username
   }
 ).select('journalEntries.entry -_id')
  .then((entries)=>{
    res.status(200).send(entries[0]) 
  })
  .catch((error)=>{
    res.status(500).send("Internal Server Error")
  })
   
})

//Post Journal Entry 
app.post('/api/profile', (req,res)=>{
  const entry = ({
    entry: req.body.entry
  })
  const username  = req.body.username
  //Push entry into array 
  //Find correct user first 
  User.findOne({username: username}).then((user) => {
    if (!user) {
      throw error
    } else {
      user.journalEntries.push(entry)
      user.save().then((updatedUser) => {
        req.session.user = updatedUser;
        res.status(200).send({updatedUser}) 
      }).catch((error)=>{
        log(error)
      res.status(500).send("Internal Server Error")
    })
    }
  }).catch((error)=>{
    log(error)
    res.status(500).send("Internal Server Error")
  })
})
// Get the mood ratings
app.get('/api/homepage-ratings',(req,res) => {

  Ratings.find().then((ratings) => {
    res.status(200).send({ ratings })
  }).catch((error) => {
    log(error)
    res.status(500).send("Internal server error")
  })

})

//Formatted Mood Ratings for Admin Page
app.get('/api/getRatings', (req,res)=>{
    Ratings.find().select('location ratings -_id')
    .then((rating)=>{
      res.status(200).send({rating})
    })
    .catch((error) => {
      log(error)
      res.status(500).send("Internal server error")
    })
})

// edit user information
app.patch('/api/edit-user',(req, res) => {
  const {name, username, region, password, email } = req.body
  User.findOne({ username: req.body.username }).then((user) => {
      user.name = name
      user.region = region
      user.email = email
      user.username = username
      if (password !== user.password) {
        user.password = password
      }
      user.save().then((user) => {
        req.session.user = user;
        res.status(200).send({user})
      })
    }).catch((error) => {
      log(error)
      res.status(500).send("Internal server error")
    })

})

//Get all users
app.get('/api/admin/edit',(req,res) => {

  User.find().then((users) => {
    res.status(200).send({users})
  })
  .catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})

})

app.patch('/api/admin/edit-user',(req, res) => {

  User.findByIdAndUpdate(
    { _id: req.body.selectedUser._id },
    {
      $set :{
            name: req.body.name,
            username: req.body.username,
            admin: req.body.admin,
            email: req.body.email,     
            region: req.body.region
          }
    }
    ).then((user) => {
      user.save().then((user) => {
        if (req.session.user.username === user.username) {
          req.session.user = user;
        }
        res.status(200).send({user})
      })
    }).catch((error) => {
      log(error)
      res.status(500).send("Internal server error")
    })

})

app.patch('/api/admin/delete-user', (req, res) => {

  User.findByIdAndDelete(
    { _id: req.body._id }
  ).then((user) => {
    res.status(200).send({user})
  }).catch((error) => {
    log(error)
    res.status(500).send("Internal server error")
  })

})

// Get all resources
app.get('/api/getresources', (req, res) => {
  Resources.find().then((resources) => {
    // log(resources)
    res.status(200).send(resources)
  }).catch((error) => {
    log(error)
    res.status(500).send("Internal Server Error")
  })
})

app.post('/api/admin/add-resource', function(req, res) {
  const { name, url, phoneNumber } = req.body;
  const resource = new Resources({ name: name, url: url, phoneNumber: phoneNumber })
  resource.save().then((resource) => {
    res.status(200).send(resource)
  }).catch((error) => {
      log(error)
      res.status(500).send("Something went wrong creating your account. Please try again.")
  });
});

app.patch('/api/admin/delete-resource', (req, res) => {

  Resources.findByIdAndDelete(
    req.body._id
  ).then((resource) => {
    res.status(200).send({resource})
  }).catch((error) => {
    log(error)
    res.status(500).send("Internal server error")
  })

})

app.patch('/api/admin/edit-resource', (req, res) => {

  Resources.findByIdAndUpdate(
    { _id: req.body.selectedResource._id },
    {
      $set :{
            name: req.body.name,
            url: req.body.url,
            phoneNumber: req.body.phoneNumber }
    }
    ).then((resource) => {
      resource.save()
      res.status(200).send({resource})
    }).catch((error) => {
      log(error)
      res.status(500).send("Internal server error")
    })

})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'memoria/build/index.html'));
});

app.listen(process.env.PORT || 5000);