# This is a sample Python script.
from PIL import Image
from os import walk
import os
import base64
from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
def filer():
    for (_, _, filenames) in walk("brypto"):
        files = filenames

    hands = []
    access = []
    body = []
    head = []
    face = []
    i = 1
    j = 1
    k = 1
    l = 1
    m = 1
    for x in files:
        if x.find("Hands") != -1:
            hands.append({i: "brypto\\" + x})
            i += 1
        elif x.find("access") != -1:
            access.append({j: "brypto\\" + x})
            j += 1
        elif x.find("Head") != -1:
            head.append({k: "brypto\\" + x})
            k += 1
        elif x.find("Eyes") != -1 or x.find("Nose") != -1 or x.find("Mouth") != -1:
            face.append({l: "brypto\\" + x})
            l += 1
        else:
            body.append({m: "brypto\\" + x})
            m += 1

    filler = dict()
    filler["hands"] = hands
    filler["access"] = access
    filler["body"] = body
    filler["head"] = head
    filler["face"] = face

    return filler


def imager(prop):
    face = prop["face"]
    hand = prop["hands"]
    access = prop["access"]
    head = prop['head']
    body = prop["body"]

    img = Image.new("RGB", (100, 100), (255, 255, 255))

    try:
        i = Image.open(body)
        img.paste(i, (0, 0), i)
        img.save("bodier.png")
    except AttributeError:
        img.save("bodier.png")

    try:
        img1 = Image.open("bodier.png")
        j = Image.open(face)
        img1.paste(j, (0, 0), j)
        img1.save("facier.png")
    except AttributeError:
        img1 = Image.open("bodier.png")
        img1.save("facier.png")

    try:
        img2 = Image.open("facier.png")
        k = Image.open(hand)
        img2.paste(k, (0, 0), k)
        img2.save("handier.png")
    except AttributeError:
        img2 = Image.open("facier.png")
        img2.save("handier.png")

    try:
        img3 = Image.open("handier.png")
        lop = Image.open(access)
        img3.paste(lop, (0, 0), lop)
        img3.save("accessier.png")
    except AttributeError:
        img3 = Image.open("handier.png")
        img3.save("accessier.png")

    try:
        img4 = Image.open("accessier.png")
        m = Image.open(head)
        img4.paste(m, (0, 0), m)
    except AttributeError:
        img4 = Image.open("accessier.png")

    img4.save("tester.png")

    os.remove("bodier.png")
    os.remove("facier.png")
    os.remove("handier.png")
    os.remove("accessier.png")
    

    with open("tester.png", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())

    os.remove("tester.png")
    return encoded_string


def prop_maker(data):
    files = filer()
    prop = dict()
    if "body" in data.keys():
        num = data["body"]
        dip = files["body"][num - 1]
        prop["body"] = dip.get(num)

        # next(item for item in dip if item["name"] == "Pam")
    else:
        prop["body"] = 0

    if "face" in data.keys():
        num = data["face"]
        dip = files["face"][num - 1]
        prop["face"] = dip.get(num)
    else:
        prop["face"] = 0

    if "hands" in data.keys():
        num = data["hands"]
        dip = files["hands"][num - 1]
        prop["hands"] = dip.get(num)
    else:
        prop["hands"] = 0

    if "access" in data.keys():
        num = data["access"]
        dip = files["access"][num - 1]
        prop["access"] = dip.get(num)
    else:
        prop["access"] = 0

    if "head" in data.keys():
        num = data["head"]
        dip = files["head"][num - 1]
        prop["head"] = dip.get(num)
    else:
        prop["head"] = 0

    return prop


@app.route('/bear', methods=['POST', 'OPTIONS'])
@cross_origin()
def bear_maker():
    request.get_json(force=False, silent=True)
    data = request.json["data"]
    prop = prop_maker(data)
    # files = filer()
    # # return files
    # # return prop
    image = imager(prop)
    #
    resp = {
        "status": True,
        "data": image.decode("utf-8")
        # "data":request.json
    }
    return resp


@app.route('/show', methods=["GET", "OPTIONS"])
@cross_origin()
def show_map():
    files = filer()
    return files


# Press the green button in the gutter to run the script.
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
