# brypto_currency

## to install this:

#1. python3 venv venv

#2. venv\Scripts\activate

#3. pip install -r requirements.txt

#4. python main.py

#5. Open Postman and place a get request to see file map:

    # GET /show

#6. Select values for various components of bear as:

    # POST /bear

    #Request:
    
    #{
    #"body":3,
    #"face":2,
    #"head":1,
    #"hands":1,
    #"access":1
    #}
    
    Response:
    {
    "status":True,
    "data": (Base64 encoded image string)
    }
   
    #7. Brypto Maker - GUI to create Bears

    #8. To start the GUI, opem brypto_GUI folder and run

    # npm i
    
    #9. then to start the application in localhost:
      
     #ionic serve
     
     #10. Make sure the Python app is running on the same machine at port 8888
     
     # And Viola:
   
    ![image](https://user-images.githubusercontent.com/69477480/127954615-06cb376d-e894-42c1-bda0-fc85d372c894.png)
    
    # (GUI to create bears)

