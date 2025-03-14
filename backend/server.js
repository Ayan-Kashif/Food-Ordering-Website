const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require("./UserSchema.js"); // Mongoose User model
const OrderNow = require("./OrderSchema2.js"); // Mongoose Order model
const Feedback=require("./FeedbackSchema.js")
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const cors = require("cors");
const { use } = require('react');
const multer = require('multer');
const path = require('path');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5173;

app.use(cors());
app.use(bodyparser.json());

//from env variables

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD; //plain password
const adminPasswordHash = bcrypt.hashSync(adminPassword, 10) //hashing the password

// Connect to MongoDB using Mongoose
const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/lahori";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected via Mongoose");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Token generation function
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

// Routes
app.get("/", async (req, res) => {
  try {
    const orders = await OrderNow.find(); // Fetch all orders using Mongoose
    const users = await User.find(); // Fetch all users using Mongoose
    res.json({ orders, users });
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.post("/register", async (req, res) => {
  const { email, name, phone, address, password } = req.body;
  console.log(req.body)
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already taken' });
    }

    // Create a new user and save it to the database
    const newUser = new User({ name, email, phone, address, password: hashedPassword });
    await newUser.save();
    const token = generateToken(newUser);

    res.status(201).json({ token, message: 'Account created successfully!' });
  } catch (error) {
    console.error("Error during registration:", error);
    setErrorMessage("Something went wrong. Please try again.");
    alert("Something went wrong. Please try again.");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    //comparing passwords
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(existingUser);
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// app.post("/loginWithGoogle", async (req, res) => {
//   console.log(req.body);

//   const { email,name} = req.body; // Extract user information from session

//   if ( !email || !name) {
//       return res.status(400).json({ success: false, message: "User email or name is missing" });
//   }

//   try {
//       // Check if user already exists by email
//       const existingUser = await User.findOne({ email: email });

//       if (existingUser) {
//           console.log("User already exists:", existingUser.name);
//           // Return the existing user data for frontend usage
//           return res.status(200).json({ success: true, user: existingUser });
//       }

//       // If user doesn't exist, create a new user
//       const newUser = new User({
//           name: name,
//           email:email,
//           phone: "", // Placeholder until user provides the phone number
//           address: "", // Placeholder until user provides the address
//       });

//       // Save the new user in the database
//       await newUser.save();
//       console.log("New user created:", newUser.name);

//       // Return a success message with user data
//       return res.status(201).json({ success: true, message: "New user created", user: newUser });

//   } catch (error) {
//       console.error("Error during login or user creation:", error);
//       // Log detailed error for debugging and return a generic message to the client
//       res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

app.post("/loginWithGoogle", async (req, res) => {
  console.log(req.body);

  console.log("Request body:", req.body);

  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ success: false, message: "User email or name is missing" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(200).json({ success: true, user: existingUser });
    }

    const newUser = new User({ name, email });
    await newUser.save();
    console.log("New user created:", newUser);

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error in loginWithGoogle:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});





app.post("/order", async (req, res) => {
  const { userID, items, name, totalPrice, email, address, phone, instructions, alternatePhone, channel } = req.body;

  try {

    // Fetch user details using userID or email
    let user;
    if (userID) {
      user = await User.findById(userID); // Find user by userID for simple login
    } else if (email) {
      user = await User.findOne({ email }); // Find user by email for Google login
    }

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

      // Check if any pizza item is missing a size
      for (let item of items) {
        if (item.name.toLowerCase().includes("pizza") && !item.size) {
          return res.status(400).json({ message: "Pizza items must have a size" });
        }
      }

    // Create a new order
    const order = new OrderNow({
      userId: user._id, // Reference to User collection
      items,
      email: email || user?.email, // Pull email from User collection
      name: name || user?.name,   // Pull name from User collection
      address: address || user?.address,
      phone: phone || user?.phone,
      channel,
      status: 'Pending', // Explicitly setting status to "Pending"
      instructions,
      totalPrice,
      alternatePhone


    });

    // Save the order to the database
    await order.save();
    console.log(order)

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    return res.status(500).json({ message: "Error placing order" });
  }
});

app.put("/admin/orders/:id", async (req, res) => {
  const { status } = req.body;  // Status value (Pending, In Progress, Delivered)
  try {
    const updatedOrder = await OrderNow.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to update order", error: err });
  }
});

app.get("/admin/orders/history", async (req, res) => {
  try {
    const orders = await OrderNow.find(); // Fetch all orders from the database
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});
app.get("/admin/orders/not-delivered", async (req, res) => {
  try {
    const orders = await OrderNow.find({
      $or: [{ status: "Pending" }, { status: "In Progress" }]
    }); // Fetch all orders that are not delivered
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


app.get("/admin/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all orders from the database
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


// POST endpoint to fetch order history for a specific user
app.post('/order-history', async (req, res) => {
  const { userId } = req.body;  // Extract userId from the request body

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    // Fetch all orders for the specified userId
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const objectId = new mongoose.Types.ObjectId(userId);  // Use `new` to create an ObjectId instance
      const orders = await OrderNow.find({
        userId: objectId,
        status: { $in: ['Delivered', 'Ready'] }  // Filter orders with status 'Delivered' or 'Ready'
      })
        .populate('userId', 'name email')  // Populate user details from the User collection
        .exec();  // Executes the query

      console.log(orders); // Output the fetched orders

      // Check if no orders are found
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user.' });
      }

      // Return the order history
      return res.status(200).json(orders);

    } else {
      console.log("Invalid userId");
    }


  } catch (err) {
    console.error('Error fetching order history:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/active-orders', async (req, res) => {
  const { userId } = req.body;  // Extract userId from the request body

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    // Fetch all orders for the specified userId
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const objectId = new mongoose.Types.ObjectId(userId);  // Use `new` to create an ObjectId instance
      const orders = await OrderNow.find({
        userId: objectId,
        status: { $in: ['Pending', 'In Progress'] }  // Filter orders with status 'Delivered' or 'Ready'
      })
        .populate('userId', 'name email')  // Populate user details from the User collection
        .exec();  // Executes the query

      console.log(orders); // Output the fetched orders

      // Check if no orders are found
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user.' });
      }

      // Return the order history
      return res.status(200).json(orders);

    } else {
      console.log("Invalid userId");
    }


  } catch (err) {
    console.error('Error fetching order history:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.post("/user", async (req, res) => {
  // Expecting userID as part of the request body
  const { userID } = req.body;  // Destructure userID from the request body

  try {
    // Fetch user from the database using the provided userID
    const user = await User.findOne({ _id: userID });

    // If no user is found, send a not found error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is found, send the user data as a response
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.post("/GoogleUser", async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch user from the database using the provided EMAIL
    const user = await User.findOne({ email });

    // If no user is found, send a not found error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is found, send the user data as a response
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
})



//For Google Login
app.post("/GoogleUser", async (req, res) => {
  // Expecting EMAIL as part of the request body
  const { email } = req.body   //destructuring email

  try {
    // Fetch user from the database using the provided EMAIL
    const user = await User.findOne({ email });

    // If no user is found, send a not found error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is found, send the user data as a response
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// app.put("/updateDetails", async (req, res) => {
//   const { userID,email, updatedUserData } = req.body;

//   if (!updatedUserData.email || !updatedUserData.name) {
//     return res.status(400).json({ message: "Email and username are required" });
//   }

//   try {
//     // Check if email or username already exists, excluding the current user
//     const existingUser = await User.findOne({ 
//       $or: [{ email: updatedUserData.email }, { name: updatedUserData.name }],
//       _id: { $ne: email } // Exclude the current user from the check
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Email or username already taken' });
//     }

//     // Update the user
//     const updatedUser = await User.findByIdAndUpdate(userID, updatedUserData, { new: true })
//       .select('-password'); // Exclude password from the response

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(updatedUser); // Return the updated user data
//   } catch (error) {
//     console.error("Error updating user data:", error);
//     res.status(500).json({ message: "Failed to update user" });
//   }
// });



app.put("/updateDetails", async (req, res) => {
  const { userID, email, updatedUserData } = req.body;

  // Check if required fields are present
  if (!updatedUserData.email || !updatedUserData.name) {
    return res.status(400).json({ message: "Email and username are required" });
  }

  try {
    // Build the query to exclude based on either userID or email
    let query = {
      $or: [{ email: updatedUserData.email }, { name: updatedUserData.name }]
    };

    // Exclude based on userID if it is provided
    if (userID) {
      query._id = { $ne: userID }; // Exclude by userID
    } else {
      // Exclude by email if userID is not provided (Google Sign-In case)
      query.email = { $ne: email }; // Exclude by email
    }

    // Check if email or username already exists, excluding the current user
    const existingUser = await User.findOne(query);

    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already taken' });
    }

    // Update the user based on userID (or email if Google Sign-In)
    const updatedUser = userID
      ? await User.findByIdAndUpdate(userID, updatedUserData, { new: true })
      : await User.findOneAndUpdate({ email }, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Return the updated user data
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

app.post("/feedback", async (req, res) => {
  const { orderId, name, feedback, phone, email, channel, visitDate ,rating} = req.body;

  try {
    // Validate all fields
    if (!orderId || !name || !feedback || !phone || !email || !channel || !visitDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the order exists for the user
    const order = await OrderNow.findOne({ _id: orderId });

    if (!order) {
      return res.status(404).json({ message: "Invalid Order Id" });
    }

    // Save feedback
    const feedbackData = new Feedback({
      orderId,
      name,
      feedback,
      phone,
      email,
      channel,
      rating,
      visitDate,
    });

    await feedbackData.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ message: "Error submitting feedback" });
  }
});





// Set up multer for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the folder where files should be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // rename the file to avoid conflicts
  },
});

const upload = multer({ storage });

// API route to upload image
app.post('/upload-profile-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
});






//Admin Login
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (username === adminUsername && bcrypt.compareSync(password, adminPasswordHash)) {
    const secretKey = process.env.JWT_SECRET_KEY;
    // Generate JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1d' });
    console.log("token:", token)
    res.json({ token });
  }
  else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
})

app.get("/admin/validate-token", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];  // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  try {

    const currentTimestamp = Math.floor(Date.now() / 1000);  // Current Unix timestamp

    // Expiration timestamp from the token
    const expTimestamp = 1735321910;

    if (currentTimestamp > expTimestamp) {
      console.log("Token has expired");
    } else {
      console.log("Token is still valid");
    }
    // Verify token
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log("Token is invalid or expired", err);
      } else {
        console.log("Decoded Token:", decoded);
      }
    })
    res.json({ message: 'Authorized' });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
