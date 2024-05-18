export const user = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "User",
    "description": "An User in E-commerce web",
    "type": "object",
    "properties": {
        "name": {
            "description": "Name of the user",
            "type": "string",
        },
        "email": {
            "description": "Email of the user",
            "type": "string",
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        "password": {
            "description": "Password of the user account",
            "type": "string",
        },
        "password_salt": {
            "description": "Password salted of the user account",
            "type": "string"
        },
        "address": {
            "description": "Address of the user",
            "type": "string"
        },
        "phone_number": {
            "description": "Phone number of the user",
            "type": "string"
        },
        "role": {
            "description": "Define the user's role (admin or user)",
            "type": "string",
        },
    },
    "required": ["name", "email", "password"]
}