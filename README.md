# Smart Notes Organizer

## 📌 Overview

Smart Notes Organizer is a **Next.js** web application designed to help users **create, edit, search, and summarize notes** with AI-powered text summarization. The app features an intuitive interface for managing notes, categorizing them, and analyzing sentiment.

## 🚀 Features

- **Create, Edit, and Delete Notes**: Manage your notes with categories for better organization.
- **Search Functionality**: Quickly search for relevant notes by title, content, or tags.
- **AI-Powered Summarization**: Summarize long notes using Hugging Face's `facebook/bart-large-cnn` model.
- **Sentiment Analysis**: Analyze and display the emotional tone of your notes.
- **Client-side Validation**: Ensure integrity by validating user input on the client side.
- **Modern UI**: Built with **Material-UI** and **Tailwind CSS** for a clean and responsive design.

---

## 🛠️ Technologies & AI Tools Used

### **Frontend:**

- **Next.js 15**: For server-side rendering and optimized performance.
- **React.js**: Component-based UI framework.
- **Material-UI**: UI components for a modern design.

### **Backend:**

- **Next.js API Routes**: Handles API requests for notes management.
- **Node.js & Express.js**: For backend logic and API integrations.
- **Supabase REST API**: Used for database management and querying tables.

### **AI Tools:**

- **Hugging Face Transformers**: Used for text summarization with the `facebook/bart-large-cnn` model.
- **Sentiment Analysis API**: Analyzes the emotional tone of notes (positive, negative, neutral).
- **Automatic Categorization API**: Assign a category based on the content of the note out of ["Work", "Personal", "Ideas", "Technology"].



---

## 💻 Running the App Locally

### **1. Clone the Repository**

## Clone the repository to your local machine and navigate to the project folder.

git clone https://github.com/yourusername/smart-notes-organizer.git
cd smart-notes-organizer


### **2. Set Up Environment Variables**
Create a .env.local file in the root directory and add your Hugging Face API key:

SUPABASE_KEY=superbase_key

SUPABASE_URL=superbase_url

NEXT_PUBLIC_HF_API_KEY=your_api_key_here


### **3.Install Dependencies
Install the necessary dependencies using npm:

npm install


### **4. Run the Application

Start the development server. The application should now be running at http://localhost:3000.

npm run dev


### **5. Running Test Cases

npm run test

---

## 🧪 Testing Approach

We use **Jest** and **React Testing Library** for unit and integration tests to ensure the app works smoothly.

### **Running Test Cases**

Run all test cases.

### **Test Coverage Areas:**

- ✅ **Component Rendering**: Ensures all components render correctly.
- ✅ **Form Validation**: Verifies required fields and input validation.
- ✅ **User Actions**: Simulates adding, editing, and deleting notes.
- ✅ **API Calls**: Mocks API requests to test summarization and sentiment analysis.

---

## 📝 Contributing

We welcome contributions to the project! If you'd like to contribute, feel free to fork the repository, make changes, and submit a pull request.

### **Steps to Contribute:**

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork.
5. Submit a pull request describing your changes.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For questions or suggestions, feel free to open an issue on GitHub or reach out to the project maintainers.

---

Enjoy using the **Smart Notes Organizer**!
