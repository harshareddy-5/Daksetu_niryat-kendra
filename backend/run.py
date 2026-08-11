import uvicorn
import os
import sys

# Ensure current directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

if __name__ == "__main__":
    print("==================================================")
    print(" Starting DAKSETU Dak Ghar Niryat Kendra AI Server ")
    print(" Running at: http://localhost:8000                ")
    print(" Interactive Docs: http://localhost:8000/docs     ")
    print("==================================================")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
