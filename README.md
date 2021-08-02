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
    
