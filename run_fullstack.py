import subprocess
import time
import webbrowser
import sys
import os

def start_fullstack():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    frontend_dir = os.path.join(base_dir, "frontend")

    print("===================================================================")
    print("   DAKSETU – SMART EXPORT ASSISTANT (DGKN-2026-09)")
    print("   Dak Ghar Niryat Kendra AI Full-Stack Launcher")
    print("===================================================================")

    # 1. Start Backend in background
    print("\n[1/3] Starting FastAPI Backend on http://localhost:8000 ...")
    backend_proc = subprocess.Popen(
        [sys.executable, "run.py"],
        cwd=backend_dir
    )

    # Wait 2 seconds for backend to start
    time.sleep(2)

    # 2. Start Frontend in background
    print("\n[2/3] Starting Vite Frontend on http://localhost:5173 ...")
    # On Windows npm is npm.cmd
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=frontend_dir
    )

    time.sleep(2)

    # 3. Open Browser
    print("\n[3/3] Opening browser at http://localhost:5173 ...")
    webbrowser.open("http://localhost:5173")

    print("\n===================================================================")
    print(" DAKSETU IS RUNNING LIVE!")
    print(" - Frontend Kiosk: http://localhost:5173")
    print(" - Backend API:    http://localhost:8000")
    print(" - Swagger Docs:   http://localhost:8000/docs")
    print(" Press Ctrl+C to stop both servers.")
    print("===================================================================")

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\nStopping DakSetu servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Done.")

if __name__ == "__main__":
    start_fullstack()
