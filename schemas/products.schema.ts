export const prodcut = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "product_id": "/product",
    "name": "Product",
    "description": "An Prodcut in E-commerce web",
    "type": "object",
    "properties": {
        "name": {
            "description": "Name of the product",
            "type": "string"
        },
        "description": {
            "description": "Description of the product",
            "type": "string"
        },
        "price": {
            "description": "Price of the product",
            "type": "number",
            "multipleOf" : 0.01
        },
        "quantity": {
            "description": "Quantity of the product",
            "type": "integer"
        },
        "category_id": {
            "description": "Catergory ID of the product",
            "type": "integer"
        },
        "seller_id": {
            "description": "Seller ID of the product",
            "type": "integer"
        },
        "image_url": {
            "description": "URL of the image to show the product",
            "type": "uri",
        },
    },
    "required": ["name", "price", "quantity"]
}
