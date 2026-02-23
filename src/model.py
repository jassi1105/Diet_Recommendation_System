
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, FunctionTransformer
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline

def scaling(dataframe):
    scaler = StandardScaler()
    prep_data = scaler.fit_transform(dataframe.iloc[:, 7:16].to_numpy())
    return prep_data, scaler

def nn_predictor(prep_data):
    neigh = NearestNeighbors(metric='cosine', algorithm='brute')
    neigh.fit(prep_data)
    return neigh

def build_pipeline(neigh, scaler, params):
    transformer = FunctionTransformer(neigh.kneighbors, kw_args=params)
    pipeline = Pipeline([
        ('std_scaler', scaler),
        ('NN', transformer)
    ])
    return pipeline

def extract_data(dataframe, ingredient_filter, max_nutritional_values):
    extracted_data = dataframe.copy()
    extracted_data = extracted_data.replace({np.nan: 0})  # ✅ avoid NaN in scaler
    for column, maximum in zip(extracted_data.columns[7:16], max_nutritional_values):
        extracted_data = extracted_data[extracted_data[column] < maximum]
    if ingredient_filter:
        for ingredient in ingredient_filter:
            extracted_data = extracted_data[
                extracted_data['RecipeIngredientParts'].str.contains(ingredient, regex=False, case=False)
            ]
    return extracted_data.reset_index(drop=True)

def apply_pipeline(pipeline, _input, extracted_data):
    indices = pipeline.transform(_input)[0]
    if len(indices) == 0:
        return pd.DataFrame(columns=extracted_data.columns)  # ✅ handle empty
    return extracted_data.iloc[indices].reset_index(drop=True)

def recommand(dataframe, _input, max_nutritional_values, ingredient_filter=None, params={'return_distance': False}):
    extracted_data = extract_data(dataframe, ingredient_filter, max_nutritional_values)
    if extracted_data.empty:
        return pd.DataFrame(columns=dataframe.columns)
    prep_data, scaler = scaling(extracted_data)
    neigh = nn_predictor(prep_data)
    pipeline = build_pipeline(neigh, scaler, params)
    return apply_pipeline(pipeline, _input, extracted_data)

def recommend_by_calories(dataframe, max_daily_fat, max_nutritional_values, ingredient_filter=None, params={'return_distance': False}):
    extracted_data = extract_data(dataframe, ingredient_filter, max_nutritional_values)
    if extracted_data.empty:
        return pd.DataFrame(columns=dataframe.columns)
    prep_data, scaler = scaling(extracted_data)
    neigh = nn_predictor(prep_data)
    pipeline = build_pipeline(neigh, scaler, params)
    test_input = np.zeros((1, 9))
    test_input[0, 1] = max_daily_fat
    return apply_pipeline(pipeline, test_input, extracted_data)