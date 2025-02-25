# ws2026-s09-r1-312
## Showcase video
https://vimeo.com/1060147919/ee659724ed?ts=0&share=copy
## How to start the app
1. Clone this repo
2. Have Docker desktop installed
3. Open the repo's folder in a console/terminal
4. Run ```docker-compose up --build ```
5. If finished without error the dashboard frontend should run on ```http://localhost:3001/``` (it launches the backend, frontend and the jsonserver)
6. To run the input script, first have the docker container running and run ```python .\input_script.py``` (numpy is required to run the tool)
    - Alternatively you can run ```python .\input_script.py --silent``` so it does not log the errors to the console, only to the .csv file

- To swap out the database you can just replace the ```database.json``` with a same structure json file
