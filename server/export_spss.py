import sys
import pandas as pd
import pyreadstat

DATA = [
    ("R0001","Greater Bangkok","Female",28,"25-34","Shopee","Fashion",650,5,"Yes","Jun-2025"),
    ("R0002","North","Male",35,"35-44","Lazada","Electronics",1240,2,"No","Jun-2025"),
    ("R0003","Northeast","Female",22,"18-24","TikTok Shop","Beauty",480,6,"Yes","Jun-2025"),
    ("R0004","South","Male",41,"35-44","Temu","Home Appliances",320,3,"No","Jun-2025"),
    ("R0005","Central & West","Female",31,"25-34","Shopee","FMCG",420,8,"Yes","Jun-2025"),
    ("R0006","Greater Bangkok","Male",26,"25-34","TikTok Shop","Fashion",580,7,"Yes","Jun-2025"),
    ("R0007","North","Female",45,"45-54","Lazada","Electronics",1800,2,"No","Jun-2025"),
    ("R0008","Northeast","Male",33,"25-34","Shopee","Food & Beverages",390,9,"Yes","Jun-2025"),
    ("R0009","South","Female",19,"18-24","TikTok Shop","Fashion",520,6,"Yes","Jun-2025"),
    ("R0010","Central & West","Male",50,"45-54","Lazada","Home Appliances",2100,1,"No","Jun-2025"),
    ("R0011","Greater Bangkok","Female",24,"18-24","Shopee","Beauty",610,5,"Yes","Jun-2025"),
    ("R0012","North","Male",38,"35-44","Temu","Lifestyle",290,4,"No","Jun-2025"),
    ("R0013","Northeast","Female",27,"25-34","Shopee","FMCG",450,7,"Yes","Jun-2025"),
    ("R0014","South","Male",44,"35-44","Lazada","Electronics",1560,2,"No","Jun-2025"),
    ("R0015","Central & West","Female",32,"25-34","TikTok Shop","Fashion",680,6,"Yes","Jun-2025"),
    ("R0016","Greater Bangkok","Male",29,"25-34","Shopee","Fashion",720,5,"Yes","Jun-2025"),
    ("R0017","North","Female",36,"35-44","Lazada","Home Appliances",1340,2,"No","Jun-2025"),
    ("R0018","Northeast","Male",21,"18-24","TikTok Shop","Food & Beverages",360,8,"Yes","Jun-2025"),
    ("R0019","South","Female",48,"45-54","Shopee","FMCG",410,6,"Yes","Jun-2025"),
    ("R0020","Central & West","Male",53,"45-54","Lazada","Electronics",1900,1,"No","Jun-2025"),
    ("R0021","Greater Bangkok","Female",23,"18-24","TikTok Shop","Beauty",540,7,"Yes","Jun-2025"),
    ("R0022","North","Male",40,"35-44","Temu","Lifestyle",310,3,"No","Jun-2025"),
    ("R0023","Northeast","Female",34,"25-34","Shopee","Fashion",690,5,"Yes","Jun-2025"),
    ("R0024","South","Male",46,"45-54","Lazada","Electronics",1680,2,"No","Jun-2025"),
    ("R0025","Central & West","Female",25,"25-34","TikTok Shop","Fashion",560,6,"Yes","Jun-2025"),
    ("R0026","Greater Bangkok","Male",37,"35-44","Shopee","FMCG",480,8,"Yes","Jun-2025"),
    ("R0027","North","Female",42,"35-44","Lazada","Home Appliances",1420,2,"No","Jun-2025"),
    ("R0028","Northeast","Male",20,"18-24","TikTok Shop","Beauty",490,7,"Yes","Jun-2025"),
    ("R0029","South","Female",30,"25-34","Shopee","Food & Beverages",370,9,"Yes","Jun-2025"),
    ("R0030","Central & West","Male",55,"55+","Temu","Lifestyle",280,3,"No","Jun-2025"),
    ("R0031","Greater Bangkok","Female",26,"25-34","Shopee","Fashion",630,5,"Yes","Jun-2025"),
    ("R0032","North","Male",43,"35-44","Lazada","Electronics",1580,2,"No","Jun-2025"),
    ("R0033","Northeast","Female",18,"18-24","TikTok Shop","Fashion",510,8,"Yes","Jun-2025"),
    ("R0034","South","Male",39,"35-44","Shopee","FMCG",440,6,"Yes","Jun-2025"),
    ("R0035","Central & West","Female",47,"45-54","Lazada","Home Appliances",1760,2,"No","Jun-2025"),
    ("R0036","Greater Bangkok","Male",22,"18-24","TikTok Shop","Beauty",570,7,"Yes","Jun-2025"),
    ("R0037","North","Female",52,"45-54","Shopee","Food & Beverages",400,6,"Yes","Jun-2025"),
    ("R0038","Northeast","Male",31,"25-34","Temu","Lifestyle",300,4,"No","Jun-2025"),
    ("R0039","South","Female",28,"25-34","Shopee","Fashion",660,5,"Yes","Jun-2025"),
    ("R0040","Central & West","Male",49,"45-54","Lazada","Electronics",2000,1,"No","Jun-2025"),
    ("R0041","Greater Bangkok","Female",35,"35-44","TikTok Shop","Fashion",590,6,"Yes","Jun-2025"),
    ("R0042","North","Male",27,"25-34","Shopee","FMCG",430,8,"Yes","Jun-2025"),
    ("R0043","Northeast","Female",44,"35-44","Lazada","Home Appliances",1500,2,"No","Jun-2025"),
    ("R0044","South","Male",19,"18-24","TikTok Shop","Beauty",460,7,"Yes","Jun-2025"),
    ("R0045","Central & West","Female",38,"35-44","Shopee","Food & Beverages",380,9,"Yes","Jun-2025"),
    ("R0046","Greater Bangkok","Male",33,"25-34","Temu","Lifestyle",320,3,"No","Jun-2025"),
    ("R0047","North","Female",24,"18-24","TikTok Shop","Fashion",530,6,"Yes","Jun-2025"),
    ("R0048","Northeast","Male",56,"55+","Lazada","Electronics",1640,2,"No","Jun-2025"),
    ("R0049","South","Female",41,"35-44","Shopee","FMCG",420,7,"Yes","Jun-2025"),
    ("R0050","Central & West","Male",29,"25-34","TikTok Shop","Fashion",600,5,"Yes","Jun-2025"),
]

COLS = ["resp_id","region","gender","age","age_group","platform","category",
        "basket_thb","freq_monthly","multi_platform","survey_month"]

df = pd.DataFrame(DATA, columns=COLS)

var_labels = {
    "resp_id": "Respondent ID",
    "region": "Region (5-group Thailand)",
    "gender": "Gender",
    "age": "Age in years",
    "age_group": "Age Group",
    "platform": "E-Commerce Platform Used",
    "category": "Product Category",
    "basket_thb": "Average Basket Size (THB)",
    "freq_monthly": "Order Frequency per Month",
    "multi_platform": "Multi-Platform Buyer (Yes/No)",
    "survey_month": "Survey Wave",
}

value_labels = {
    "gender": {"Male": 1, "Female": 2},
    "platform": {"Shopee": 1, "Lazada": 2, "TikTok Shop": 3, "Temu": 4},
    "region": {
        "Greater Bangkok": 1, "Central & West": 2,
        "North": 3, "Northeast": 4, "South": 5
    },
    "multi_platform": {"Yes": 1, "No": 2},
}

# Convert categorical to numeric for SPSS coding
df_spss = df.copy()
for col, mapping in value_labels.items():
    df_spss[col + "_code"] = df_spss[col].map(mapping)

vl_spss = {
    "gender_code": {1: "Male", 2: "Female"},
    "platform_code": {1: "Shopee", 2: "Lazada", 3: "TikTok Shop", 4: "Temu"},
    "region_code": {1: "Greater Bangkok", 2: "Central & West", 3: "North", 4: "Northeast", 5: "South"},
    "multi_platform_code": {1: "Yes", 2: "No"},
}

col_labels = {**var_labels, **{
    "gender_code": "Gender (coded)",
    "platform_code": "Platform (coded)",
    "region_code": "Region (coded)",
    "multi_platform_code": "Multi-Platform Buyer (coded)",
}}

out_path = sys.argv[1] if len(sys.argv) > 1 else "/tmp/platform_tracker_data.sav"
pyreadstat.write_sav(df_spss, out_path, column_labels=col_labels, variable_value_labels=vl_spss)
print(f"SPSS file written to {out_path}")
