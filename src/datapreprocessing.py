import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

colors = ["#89CFF0", "#FF69B4", "#FFD700", "#7B68EE", "#FF4500",
          "#9370DB", "#32CD32", "#8A2BE2", "#FF6347", "#20B2AA",
          "#FF69B4", "#00CED1", "#FF7F50", "#7FFF00", "#DA70D6"]

data=pd.read_csv("src/data/recipes.csv")

#print(data.head())
#print(data.shape)
#print(data.describe())

#print(data.info())
#print(data.isnull().sum())
#(data.isnull().sum()/(len(data)))*100
copy_data = data.copy()
copy_data.RecipeServings = pd.to_numeric(copy_data.RecipeServings, errors='coerce')
#print(copy_data.info())
#print(data.isnull().sum())
#copy_data.loc[copy_data ['RecipeServings'].isnull() == True]
#print(x[["Name","RecipeServings"]])
#(copy_data.isnull().sum())*100/copy_data.shape[0]


copy_data.dropna(how = 'any', inplace = True)
#print(copy_data[["Calories"]].max())
#print(copy_data.isnull().sum())
#print(copy_data[["RecipeServings"]])
ana_copy_data=data.copy()  

labels = ["{0}-{1}".format(i, i + 11) for i in range(1, 72, 12)]

copy_data['Calories'] = pd.cut(data.Calories, range(1, 80, 12), right=False, labels=labels)

copy_data.drop(columns='Calories', axis=1, inplace=True)
#print(copy_data.head())
#print(copy_data.info())
#print(copy_data[["Calories"]])

#print(ana_copy_data.describe())
#print(ana_copy_data.describe(include='all').T)

cat_cols=ana_copy_data.select_dtypes(include=['object']).columns
num_cols = ana_copy_data.select_dtypes(include=np.number).columns.tolist()
print("Categorical Variables:")
print(cat_cols)
print("Numerical Variables:")
print(num_cols)