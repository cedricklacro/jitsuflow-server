# JitsuFlow API Documentation

## 📌 Overview
JitsuFlow is an API designed for managing Brazilian Jiu-Jitsu (BJJ) training notes. Users can create, categorize, tag, and connect notes while uploading images and leaving comments.

---

## 📌 API Endpoints

### **1️⃣ Create a Note**
#### **`POST /notes`**
Creates a new note with title, category, content, tags, and paths.

#### **📌 Request Body**
```json
{
  "user_id": 1,
  "category_id": 4,
  "title": "Triangle Choke",
  "content": "<p>A powerful submission from guard...</p>",
  "tags": ["submission", "guard attack"],
  "entry_paths": ["Double Leg Takedown", "New Position Entry"],
  "exit_paths": ["Armbar"],
  "counter_for": ["Posture Up"],
  "can_be_countered_by": ["Stack Pass"]
}

Response

{
  "message": "Note created successfully",
  "note_id": 2
}

2️⃣ Get All Note Titles
GET /notes/titles
Returns a list of all notes with their note_id and title.
```json
[
  { "note_id": 1, "title": "Double Leg Takedown" },
  { "note_id": 2, "title": "Triangle Choke" },
  { "note_id": 3, "title": "Guard Retention" }
]

3️⃣ Get Categories
GET /notes/categories
Returns a list of note categories.
```json
[
  { "category_id": 1, "name": "Takedowns" },
  { "category_id": 2, "name": "Defenses" },
  { "category_id": 3, "name": "Positional control" },
  { "category_id": 4, "name": "Submissions" },
  { "category_id": 5, "name": "Others" }
]

4️⃣ Get Notes by Category
GET /notes/category/:categoryId
Fetches notes under a specific category. Use "all" to get all notes.

📌 Example Requests

GET /notes/category/2 → Get notes under "Defenses"
GET /notes/category/all → Get all notes

```json
[
  {
    "note_id": 1,
    "title": "Double Leg Takedown",
    "tags": ["takedown", "wrestling"]
  },
  {
    "note_id": 2,
    "title": "Triangle Choke",
    "tags": ["submission"]
  }
]

5️⃣ Get Note Details
GET /notes/:noteId
Returns full details of a specific note, including title, content, tags, paths, and category.

📌 Example Request
GET /notes/2

```json
{
  "note_id": 2,
  "title": "Triangle Choke",
  "content": "<p>A refined version of the triangle choke...</p>",
  "category_id": 4,
  "category_name": "Submissions",
  "tags": ["submission", "guard attack"],
  "paths": {
    "entry": [{ "note_id": 1, "title": "Double Leg Takedown" }],
    "exit": [{ "note_id": 3, "title": "Guard Retention" }],
    "counter_for": [{ "note_id": 4, "title": "Posture Up" }],
    "can_be_countered_by": [{ "note_id": 5, "title": "Stack Pass" }]
  }
}

6️⃣ Get Comments for a Note
GET /notes/:noteId/comments
Retrieves comments for a specific note.
📌 Response
```json
[
  {
    "comment_id": 1,
    "user_id": 1,
    "username": "grappler1",
    "comment": "Great takedown for no-gi!",
    "category": "success",
    "created_at": "2025-02-23T05:20:18.000Z"
  },
  {
    "comment_id": 2,
    "user_id": 1,
    "username": "grappler2",
    "comment": "Need to lower my level more.",
    "category": "adjustment",
    "created_at": "2025-02-24T12:15:42.000Z"
  }
]

7️⃣ Update Note Details
PUT /notes/:noteId
Updates a note's title, content, category, tags, and paths.
If a new path is added and the linked note doesn’t exist, it will be automatically created.

📌 Request Body
```json
{
  "title": "Updated Triangle Choke",
  "content": "<p>Refining my technique...</p>",
  "category_id": 4,
  "tags": ["submission", "guard attack"],
  "entry_paths": ["Double Leg Takedown", "New Position Entry"],
  "exit_paths": ["Armbar"],
  "counter_for": ["Posture Up"],
  "can_be_countered_by": ["Stack Pass"],
  "user_id": 1
}

📌 Response
```json
{
  "message": "Note updated successfully",
  "note": {
    "note_id": 2,
    "title": "Updated Triangle Choke",
    "content": "<p>Refining my technique...</p>",
    "category_id": 4
  }
}

8️⃣ File Upload (Image)
POST /upload
Uploads an image to the server.

📌 Request Format
Content-Type: multipart/form-data
Field name: image
File is stored in /public/images/
📌 Example Response
```json
{
  "message": "File uploaded successfully",
  "image_url": "/images/triangle_choke.jpg"
}

📌 Notes
The API is RESTful, and all requests are JSON-based.
Image uploads must be in multipart/form-data format.
Notes content supports rich text (HTML-based) using Quill.js.

🚀 Setup Instructions
Clone the repository:
sh
Copy
Edit
git clone https://github.com/your-repo/jitsuflow-api.git
Install dependencies:
npm install
Run database migrations:
npm run migrate
Seed the database:
npm run seed
Start the server:
npm run start