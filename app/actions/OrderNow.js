// "use client";

// import { useRouter } from "next/navigation";

// const OrderNow = (e, setBucket, bucket, router) => {
//   // Safeguard against null references
//   const cardData = e.target.closest(".card");
//   if (!cardData) return;

//   // Extract product details
//   const prodName = cardData.querySelector(".name").innerText;
//   const prodDesc = cardData.querySelector(".desc").innerText;
//   const prodPrice = cardData.querySelector(".price").innerText
//   console.log(prodPrice)
//   const prodImage = cardData.querySelector("img").getAttribute("src");
// console.log(prodImage)
//   // Retrieve the existing bucket from localStorage or start with an empty array if not present  ...MOST IMPORTANT😊
//   const existingBucket = JSON.parse(localStorage.getItem("bucket")) || [];

//   // Check if the product already exists in the bucket
//   const existingItemIndex = existingBucket.findIndex(item => item.name === prodName);

//   if (existingItemIndex !== -1) {
//     // If item exists, update its quantity
//     existingBucket[existingItemIndex].qty += 1;
//   } else {
//         // If item doesn't exist, add the new item with a quantity of 1
//         existingBucket.push({ name: prodName, desc: prodDesc, price: prodPrice, qty: 1 ,src:prodImage});

//   }
 

//   // Save the updated bucket to localStorage
//   localStorage.setItem("bucket", JSON.stringify(existingBucket));

//   // Update the state with the new bucket
//   setBucket(existingBucket);
//   console.log("Data saved to localStorage:", existingBucket);


//     // Retrieve the token from localStorage
//     const token = localStorage.getItem("authToken");

//     if(!token){
//       router.push("/login")
//     }
//   // Send product data to the server  
//   const postData = async () => {
//     await fetch("http://localhost:5173/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization":`Bearer ${token}`
      
//       },
//       body: JSON.stringify({
//         items:existingBucket
//       })
//     });
//   };

//   // Execute post request
//   postData();

//   // After saving the data and updating state, navigate to the bucket page
//   router.push("/bucket");
// };

// export default OrderNow;


// // "use client";

// // import { useRouter } from "next/navigation";

// // const OrderNow = (e, setBucket, bucket, router) => {
// //   // Safeguard against null references
// //   const cardData = e.target.closest(".card");
// //   if (!cardData) return;

// //   // Extract product details
// //   const prodName = cardData.querySelector(".name").innerText;
// //   const prodDesc = cardData.querySelector(".desc").innerText;
// //   const prodPrice = cardData.querySelector(".price").innerText
// //   const sizeDropdown = cardData.querySelector("select"); // Find the dropdown for size if it exists
// //   const prodSize = sizeDropdown ? sizeDropdown.value : null;
// //   console.log(prodPrice,prodSize)
// //   const prodImage = cardData.querySelector("img").getAttribute("src");
// //   console.log(prodImage)


// //   // Check if the product is a pizza and validate size
// //   if (prodName.toLowerCase().includes("pizza") && !prodSize) {
// //     alert("Please select a size for the pizza before adding it to the bucket.");
// //     return;
// //   }
// //   // Retrieve the existing bucket from localStorage or start with an empty array if not present  ...MOST IMPORTANT😊
// //   const existingBucket = JSON.parse(localStorage.getItem("bucket")) || [];

// //   // Check if the product already exists in the bucket (match by name and size)
// //   const existingItemIndex = existingBucket.findIndex((item) => {
// //     if (prodName.toLowerCase().includes("pizza")) {
// //       // For pizza, match by both name and size
// //       return item.name === prodName && item.size === prodSize;
// //     } else {
// //       // For other items, match only by name
// //       return item.name === prodName;
// //     }
// //   });
  

// //   if (existingItemIndex !== -1) {
// //     // If item exists, update its quantity
// //     existingBucket[existingItemIndex].qty += 1;
// //   } else {
// //     // If item doesn't exist, add the new item with a quantity of 1
// //     existingBucket.push({
// //       name: prodName,
// //       desc: prodDesc,
// //       price: prodPrice,
// //       qty: 1,
// //       src: prodImage,
// //       size: prodSize,
// //       // Add size if it's a pizza 
// //       });

// //     }


// //   // Save the updated bucket to localStorage
// //   localStorage.setItem("bucket", JSON.stringify(existingBucket));

// //     // Update the state with the new bucket
// //     setBucket(existingBucket);
// //     console.log("Data saved to localStorage:", existingBucket);


// //     // Retrieve the token from localStorage
// //     const token = localStorage.getItem("authToken");

// //     if (!token) {
// //       router.push("/login")
// //     }
// //     // Send product data to the server  
// //     const postData = async () => {
// //       await fetch("http://localhost:5173/", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "Authorization": `Bearer ${token}`

// //         },
// //         body: JSON.stringify({
// //           items: existingBucket
// //         })
// //       });
// //     };

// //     // Execute post request
// //     postData();

// //     // After saving the data and updating state, navigate to the bucket page
// //     router.push("/bucket");
// //   };




// //   export default OrderNow;



"use client";

import { useRouter } from "next/navigation";

const OrderNow = (e, setBucket, router,size) => {
  const cardData = e.target.closest(".card");
  if (!cardData) return;

  const prodName = cardData.querySelector(".name").innerText;
  const prodDesc = cardData.querySelector(".desc").innerText;
  const prodPrice = cardData.querySelector(".price").innerText;
 
// const sizeDropdown = cardData.querySelector(".size-dropdown"); // Find the select element
// const prodSize = sizeDropdown ? sizeDropdown.value : null; // Get the selected size
//     console.log(prodPrice,prodSize,sizeDropdown)
  const prodImage = cardData.querySelector("img").getAttribute("src");

  const existingBucket = JSON.parse(localStorage.getItem("bucket")) || [];
  console.log("Existing  Bucket is:",existingBucket)

  // const existingItemIndex = existingBucket.findIndex(
  //   (item) =>
  //     item.name === prodName &&
  //     item.desc === prodDesc &&
  //     item.price === prodPrice &&
  //     item.src === prodImage
  
  // );
    // Check if the product already exists in the bucket (match by name and size)
  const existingItemIndex = existingBucket.findIndex((item) => {
    if (prodName.toLowerCase().includes("pizza")) {
      // For pizza, match by both name and size
      return item.name === prodName && item.size === size;
    } else {
      // For other items, match only by name
      return item.name === prodName && item.desc === prodDesc && item.price === prodPrice && item.src === prodImage;
    }
  });

  if (existingItemIndex !== -1) {
    existingBucket[existingItemIndex].qty += 1;
  } else {
    console.log("Existing Bucket Before Update:", existingBucket);


    existingBucket.push({
      name: prodName,
      desc: prodDesc,
      price: prodPrice,
      qty: 1,
      src: prodImage,
      size:size
     // Add size if it's a pizza 
    })
  }
  console.log("Existing Bucket After Update:", existingBucket);

  localStorage.setItem("bucket", JSON.stringify(existingBucket));
  console.log(existingBucket)
  setBucket([...existingBucket]); // Update state to trigger re-render

  const token = localStorage.getItem("authToken");

  if (!token) {
    router.push("/login");
    return;
  }

  const postData = async () => {
    await fetch("http://82.29.153.135:5174/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: existingBucket,
      }),
    });
  };

  postData();
  router.push("/bucket");
};

export default OrderNow
