createNote

POST /notes
Content-Type: application/json

{
  "user_id": 1,
  "category_id": 2,
  "title": "Side Control Escape",
  "content": "A technique to escape from side control.",
  "tags": ["escape", "defense"],
  "paths": [
    { "from_note": 1, "to_note": 3, "path_type": "entry" }
  ]
}
Response:
{
  "message": "Note created successfully",
  "note_id": 10
}

updateNoteDetails

{
    "title": "Updated Triangle Choke",
    "content": "A refined version of the triangle choke for better control.",
    "category_id": 5,
    "tags": ["submission", "guard attack"],
    "entry_paths": ["Double Leg Takedown", "New Position Entry"],
    "exit_paths": ["Armbar"],
    "counter_for": ["Posture Up"],
    "can_be_countered_by": ["Stack Pass"],
    "user_id": 1
}

{
    "title": "Updated Triangle Choke",
    "content": "A refined version of the triangle choke for better control.",
    "category_id": 5,
    "tags": ["submission"],  // "guard attack" tag will be removed
    "entry_paths": ["Double Leg Takedown"], // "New Position Entry" will be removed
    "exit_paths": [],  // All exit paths will be removed
    "counter_for": ["Posture Up"],  // Keeps "Posture Up", removes anything else
    "can_be_countered_by": [],  // Removes "Stack Pass"
    "user_id": 1
}

createNote
{
    "user_id": 1,
    "category_id": 5,
    "title": "Triangle Choke",
    "content": "A refined version of the triangle choke for better control.",
    "tags": ["submission", "guard attack"],
    "entry_paths": ["Double Leg Takedown", "New Position Entry"],
    "exit_paths": ["Armbar"],
    "counter_for": ["Posture Up"],
    "can_be_countered_by": ["Stack Pass"]
}