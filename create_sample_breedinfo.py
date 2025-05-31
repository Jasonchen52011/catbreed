#!/usr/bin/env python3
"""
创建示例的breedinfo.txt文件，包含额外的品种信息
"""

import json

def create_sample_breedinfo():
    """创建示例的品种信息数据"""
    
    # 加载现有的cat.json数据来获取品种名称
    try:
        with open('public/cat.json', 'r', encoding='utf-8') as f:
            cat_data = json.load(f)
    except Exception as e:
        print(f"无法读取cat.json: {e}")
        return
    
    # 创建示例的品种信息数据
    breed_info_data = []
    
    # 为每个品种创建示例信息
    for cat in cat_data[:5]:  # 只为前5个品种创建示例
        breed_name = cat.get("breed_name", "")
        
        sample_info = {
            "breed_name": breed_name,
            "Typical Temperament & Behavior": f"{breed_name} cats are known for their friendly and playful nature. They are intelligent, social, and make excellent companions.",
            "Notable Health Tendencies & Special Care Needs": f"{breed_name} cats generally have good health. Regular vet checkups, proper nutrition, and daily grooming are recommended.",
            "fun_fact_1": f"{breed_name} cats have a unique personality trait that makes them special!",
            "fun_fact_2": f"Did you know that {breed_name} cats originated from a specific region and have fascinating history?",
            "fun_fact_3": f"{breed_name} cats are known for their distinctive physical features and behavior patterns."
        }
        
        breed_info_data.append(sample_info)
    
    # 保存示例数据
    try:
        with open('public/breedinfo.txt', 'w', encoding='utf-8') as f:
            json.dump(breed_info_data, f, ensure_ascii=False, indent=4)
        print(f"已创建示例breedinfo.txt文件，包含{len(breed_info_data)}个品种的信息")
        print("请根据实际需要修改这些信息")
    except Exception as e:
        print(f"保存文件失败: {e}")

if __name__ == "__main__":
    create_sample_breedinfo() 