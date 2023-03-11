from flask import Flask, render_template, url_for, request, jsonify
from model import Decision
import time

import warnings
warnings.filterwarnings("ignore")

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method=="POST":
        data = request.form
        print(data)

        # creating input necessary for model
        if data:
            recency, used_discount, history, offer = data["recency"], data["used_discount"], data["history"], data["offer"]

            # if offer == 'Discount' -> 1  ;;; offer==BOGO->0 ;;;; ELSE->2:

            # loading model
            model = Decision()
            result = model.decision(int(recency), int(used_discount), int(history), int(offer))
            print(result[0])
            time.sleep(1)
            query = {
                "ans": int(result[0]),
                "history": history,
                "offer": offer,
                "used_discount": used_discount,
                "recency": recency,
            }
            return query
        return {"ans": "Invalid Data"}
    return {"ans": "Wrong Method, call POST Instead"}


if __name__ == "__main__":
    app.run(debug=True)
    # app.run()