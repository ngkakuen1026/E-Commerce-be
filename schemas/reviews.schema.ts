export const review = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "review_id": "/review",
    "name": "Review",
    "description": "Review of the product in E-commerce web",
    "type": "object",
    "properties": {
        "user_id": {
            "description": "ID of the user who write the review",
            "type": "integer",
        },
        "product_id": {
            "description": "ID of the reviewed product",
            "type": "integer",
        },
        "rating": {
            "description": "Rating of the product",
            "type": "integer",
        },
        "review_text": {
            "description": "Review of the product",
            "type": "string",
        },
    },
    "required": ["rating", "review_text"]
}