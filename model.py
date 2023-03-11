import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix, accuracy_score

class Decision:
    def decision(self, recency, used_discount, history, offer):
        df = pd.read_csv('data.csv')

        data = df[["recency", "used_discount", "history", "offer", "conversion"]]
        lc = LabelEncoder()
        data['offer'] = lc.fit_transform(data['offer'])

        X = data.iloc[:, :-1].values
        y = data.iloc[:, -1].values

        # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state = 0, stratify=data["conversion"])

        classifier = DecisionTreeClassifier()
        classifier.fit(X, y)

        val = [recency, used_discount, history, offer]

        y_pred = classifier.predict([val])
        print("Given->", y_pred)
        return y_pred

# obj = Decision()
# print(obj.decision(2, 1, 200, 1))