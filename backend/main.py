from fastapi import FastAPI
from server.view.category_view import CategoryView
from server.view.product_view import ProductView
from server.view.user_view import UserView
app = FastAPI()

# Include the category router with a prefix and tag
app.include_router(CategoryView.router, prefix="/category", tags=["Category"])
app.include_router(ProductView.router, prefix="/product", tags=["Product"])
app.include_router(UserView.router, prefix="/user", tags=["User"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Category API"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
