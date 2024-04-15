export const pin = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "pin_id": "/pin",
    "name": "Pin",
    "description": "Pins of the product in E-commerce web",
    "type": "object",
    "properties": {
        "user_id": {
            "description": "ID of the user who pin the product",
            "type": "integer",
        },
        "product_id": {
            "description": "ID of the pinned product",
            "type": "integer",
        },
        "pin": {
            "description": "Pin of the product",
            "type": "integer",
        },
        "visited": {
            "description": "A condition whether user had visited the product or not",
            "type": "boolean",
        },
    },
    "required": ["pin"]
}