export const cart = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "cart_id": "/cart",
    "name": "Cart",
    "description": "An User in E-commerce web",
    "type": "object",
    "properties": {
        "user_id": {
            "description": "ID of the user",
            "type": "integer",
        },
        "product_id": {
            "description": "ID of the selected product",
            "type": "integer",
        },
        "quantity": {
            "description": "Quantity of the selected product",
            "type": "integer",
        }
    }
}