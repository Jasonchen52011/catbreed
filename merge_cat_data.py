#!/usr/bin/env python3
"""
脚本功能：将breedinfo.txt的内容根据breed_name匹配，添加到cat.json对应的内容里
"""

import json
import sys
from pathlib import Path

def load_json_file(file_path):
    """加载JSON文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"错误：找不到文件 {file_path}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"错误：解析JSON文件 {file_path} 失败: {e}")
        sys.exit(1)

def save_json_file(data, file_path):
    """保存JSON文件"""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"成功保存更新后的数据到 {file_path}")
    except Exception as e:
        print(f"错误：保存文件 {file_path} 失败: {e}")
        sys.exit(1)

def merge_cat_data():
    """合并猫咪数据"""
    # 文件路径
    cat_json_path = Path("public/cat.json")
    breed_info_path = Path("public/breedinfo.txt")
    output_path = Path("public/cat_merged.json")  # 新文件，避免覆盖原文件
    
    # 检查文件是否存在
    if not cat_json_path.exists():
        print(f"错误：找不到文件 {cat_json_path}")
        sys.exit(1)
    
    if not breed_info_path.exists():
        print(f"错误：找不到文件 {breed_info_path}")
        sys.exit(1)
    
    # 加载数据
    print("正在加载cat.json...")
    cat_data = load_json_file(cat_json_path)
    
    print("正在加载breedinfo.txt...")
    breed_info_data = load_json_file(breed_info_path)
    
    # 创建breed_name到breed_info的映射
    breed_info_map = {}
    for breed_info in breed_info_data:
        breed_name = breed_info.get("breed_name", "").strip()
        if breed_name:
            breed_info_map[breed_name] = breed_info
    
    print(f"从breedinfo.txt加载了 {len(breed_info_map)} 个品种信息")
    
    # 合并数据
    matched_count = 0
    unmatched_breeds = []
    
    for cat in cat_data:
        cat_breed_name = cat.get("breed_name", "").strip()
        
        if cat_breed_name in breed_info_map:
            # 找到匹配的品种，添加新字段
            breed_info = breed_info_map[cat_breed_name]
            
            # 添加新字段，避免覆盖现有字段
            if "Typical Temperament & Behavior" in breed_info:
                cat["Typical_Temperament_Behavior"] = breed_info["Typical Temperament & Behavior"]
            
            if "Notable Health Tendencies & Special Care Needs" in breed_info:
                cat["Notable_Health_Tendencies_Special_Care_Needs"] = breed_info["Notable Health Tendencies & Special Care Needs"]
            
            if "fun_fact_1" in breed_info:
                cat["fun_fact_1"] = breed_info["fun_fact_1"]
            
            if "fun_fact_2" in breed_info:
                cat["fun_fact_2"] = breed_info["fun_fact_2"]
            
            if "fun_fact_3" in breed_info:
                cat["fun_fact_3"] = breed_info["fun_fact_3"]
            
            matched_count += 1
            print(f"✓ 已匹配品种: {cat_breed_name}")
        else:
            unmatched_breeds.append(cat_breed_name)
            print(f"✗ 未找到匹配的品种: {cat_breed_name}")
    
    # 输出统计信息
    print(f"\n合并完成！")
    print(f"总共处理了 {len(cat_data)} 个品种")
    print(f"成功匹配了 {matched_count} 个品种")
    print(f"未匹配的品种数量: {len(unmatched_breeds)}")
    
    if unmatched_breeds:
        print(f"\n未匹配的品种列表:")
        for breed in unmatched_breeds:
            print(f"  - {breed}")
    
    # 保存合并后的数据
    save_json_file(cat_data, output_path)
    
    # 询问是否覆盖原文件
    user_input = input(f"\n是否要覆盖原始的cat.json文件？(y/N): ").strip().lower()
    if user_input in ['y', 'yes']:
        save_json_file(cat_data, cat_json_path)
        print(f"已覆盖原始文件 {cat_json_path}")
    else:
        print(f"合并后的数据已保存到 {output_path}")

if __name__ == "__main__":
    merge_cat_data() 