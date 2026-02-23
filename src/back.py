import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommand

data=pd.read_csv("src/data/recipes.csv")
columns=['RecipeId','Name','CookTime','PrepTime','TotalTime','RecipeIngredientParts','RecipeCategory','Calories','FatContent','SaturatedFatContent',
         'CholesterolContent','SodiumContent','CarbohydrateContent','FiberContent','SugarContent','ProteinContent','RecipeInstructions']

dataset = data[columns].dropna().copy()



# Initialize Flask
back = Flask(__name__)

# Enable CORS for React (localhost:5173)
CORS(back)

# Define API route
@back.route('/data', methods=['POST'])
def receive_data():
    data = request.get_json()  # JSON from frontend
    #print(f"Received data: {data}")

    # Safely parse
    age = int(data.get('age', 0) or 0)
    gender = data.get('gender', '').lower()
    weight = float(data.get('weight', 0) or 0)
    height = float(data.get('height', 0) or 0)
    activity_level = data.get('activity_level', '').lower()
    goal = data.get('goal', '').lower()
    # print("goal:",goal.lower(),type(goal.lower()),"activity_level:",activity_level.lower(),
    #       type(activity_level.lower()),"gender:",gender.lower(),type(gender.lower()),"age:",age,type(age),
    #       "weight:",weight,type(weight),"height:",height,type(height))


    def get_daily_nutrition(age, gender, weight, height, activity_level, goal): 
         # 1. Calculate BMR (Mifflin-St Jeor Equation)
        if gender.lower() == "male":
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
        else:
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
        
    # """``
    # Calculate daily nutrition requirements based on user details.
    
    # Parameters:₹
    #     age (int)               : Age in years
    #     gender (str)            : "male" or "female"
    #     weight (float)          : Weight in kg
    #     height (float)          : Height in cm
    #     activity_level (str)    : "sedentary", "light", "moderate", "active"
    #     goal (str)              : "loss", "maintenance", "gain"
    
    # Returns:
    #     dict : Dictionary containing max_Calories, macros & nutrient limits
    # """

   

    # 2. Activity multipliers
        activity_factors = {
            "sedentary": 1.2,
            "lightly active": 1.375,
            "moderately active": 1.55,
            "very active": 1.725
          }
        tdee = bmr * activity_factors.get(activity_level.lower())

    # 3. Adjust for goal
        if goal.lower() == "lose weight":
            calories = tdee - 500
        elif goal.lower() == "gain weight":
            calories = tdee + 500
        else:  # maintenance
            calories = tdee

    # 4. Macronutrient split (50% carbs, 20% protein, 30% fat)
        carbs = (calories * 0.50) / 4
        protein = (calories * 0.20) / 4
        fat = (calories * 0.30) / 9

    # 5. Other limits
        saturated_fat = (calories * 0.10) / 9   # 10% of calories
        cholesterol = 300  # mg/day
        sodium = 2300      # mg/day
        fiber = 25 if gender.lower() == "female" else 38  # g/day
        sugar = (calories * 0.10) / 4  # 10% of calories

        return [
            round(calories, 1), round(fat, 1), round(saturated_fat, 1),
            cholesterol, sodium, round(carbs, 1), fiber, round(sugar, 1),
            round(protein, 1)
        ]
    values = get_daily_nutrition(age, gender, weight, height, activity_level, goal)
    max_list = [v / 3 for v in values]  # Thresholds
    print("values:",values)
    print("max_list:",max_list)
    _input = np.array(values).reshape(1, -1)

    # Recommend
    result = recommand(dataset, _input, max_list)
    print(result.info())

    # ✅ Replace NaN before JSON
    result = result.replace({np.nan: None})
    print("Recommended recipes:\n", result)

    return jsonify(result.to_dict(orient="records"))
    

if __name__ == '__main__':
    back.run(debug=True, port=5000)