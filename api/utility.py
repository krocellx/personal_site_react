import pandas as pd
import json


def transform_fundamental_list_to_dict(ls_fundamental: list) -> dict:
    df_fundamental = pd.DataFrame(ls_fundamental).iloc[::-1]
    dict_fundamental = df_fundamental.to_dict("records")
    return dict_fundamental


if __name__ == "__main__":
    pass
