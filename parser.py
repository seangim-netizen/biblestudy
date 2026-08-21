# -*- coding: utf-8 -*-
import os
import re
import json
import zipfile

# 표준 성경 66권 한글 이름 매핑
BIBLE_BOOKS = {
    1: "창세기", 2: "출애굽기", 3: "레위기", 4: "민수기", 5: "신명기",
    6: "여호수아", 7: "사사기", 8: "룻기", 9: "사무엘상", 10: "사무엘하",
    11: "열왕기상", 12: "열왕기하", 13: "역대상", 14: "역대하", 15: "에스라",
    16: "느헤미야", 17: "에스더", 18: "욥기", 19: "시편", 20: "잠언",
    21: "전도서", 22: "아가", 23: "이사야", 24: "예레미야", 25: "예레미야애가",
    26: "에스겔", 27: "다니엘", 28: "호세아", 29: "요엘", 30: "아모스",
    31: "오바디야", 32: "요나", 33: "미가", 34: "나훔", 35: "하박국",
    36: "스바냐", 37: "학개", 38: "스가랴", 39: "말라기",
    40: "마태복음", 41: "마가복음", 42: "누가복음", 43: "요한복음", 44: "사도행전",
    45: "로마서", 46: "고린도전서", 47: "고린도후서", 48: "갈라디아서", 49: "에베소서",
    50: "빌립보서", 51: "골로새서", 52: "데살로니가전서", 53: "데살로니가후서", 54: "디모데전서",
    55: "디모데후서", 56: "디도서", 57: "빌레몬서", 58: "히브리서", 59: "야고보서",
    60: "베드로전서", 61: "베드로후서", 62: "요한1서", 63: "요한2서", 64: "요한3서",
    65: "유다서", 66: "요한계시록"
}

def parse_single_file(file_path, output_js_path, var_name):
    """
    단일 파일 성경 텍스트 파싱
    형식: [책번호] [장:절] [본문] (예: 01 1:1 태초에...)
    """
    print(f"Parsing single file: {os.path.basename(file_path)} -> {var_name}")
    bible_data = {}
    
    # 모든 책이름 초기화
    for name in BIBLE_BOOKS.values():
        bible_data[name] = {}
        
    line_pattern = re.compile(r'^(\d+)\s+(\d+):(\d+)\s*(.*)$')
    
    with open(file_path, 'r', encoding='cp949', errors='ignore') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
                
            match = line_pattern.match(line)
            if not match:
                # 0:0 메타데이터 라인이나 헤더 라인 등은 무시
                continue
                
            book_num = int(match.group(1))
            chapter = int(match.group(2))
            verse = int(match.group(3))
            content = match.group(4).strip()
            
            # 영문 번역 데이터 내의 닫는 괄호 LORD] 오염 찌꺼기 정제
            content = content.replace("LORD]", "LORD")
            
            # 메타데이터 라인(0장 또는 0절) 건너뛰기
            if chapter == 0 or verse == 0:
                continue
                
            if book_num not in BIBLE_BOOKS:
                continue
                
            book_name = BIBLE_BOOKS[book_num]
            ch_str = str(chapter)
            
            if ch_str not in bible_data[book_name]:
                bible_data[book_name][ch_str] = []
                
            verse_list = bible_data[book_name][ch_str]
            
            # 절 번호 인덱스 맞추기 (절이 건너뛰었을 때 빈 문자열 채워줌)
            target_idx = verse - 1
            while len(verse_list) < target_idx:
                verse_list.append("")
                
            if len(verse_list) == target_idx:
                verse_list.append(content)
            else:
                # 동일 절에 대해 중복/추가 데이터가 있는 경우 덮어쓰거나 붙여씀
                verse_list[target_idx] = content

    # JS 파일로 쓰기
    os.makedirs(os.path.dirname(output_js_path), exist_ok=True)
    with open(output_js_path, 'w', encoding='utf-8') as out:
        out.write(f"window.{var_name} = ")
        json.dump(bible_data, out, ensure_ascii=False, indent=2)
        out.write(";\n")
    print(f"Saved to {output_js_path}")

def parse_zip_file(zip_path, output_js_path, var_name):
    """
    ZIP 압축파일 내의 66개 성경 파일 파싱
    각 파일 구조: [약칭][장]:[절] [본문] (예: 창1:1 태초에...)
    파일명 구조: [책번호] [이름].txt
    """
    print(f"Parsing zip file: {os.path.basename(zip_path)} -> {var_name}")
    bible_data = {}
    
    for name in BIBLE_BOOKS.values():
        bible_data[name] = {}
        
    line_pattern = re.compile(r'^([^\d\s]+)(\d+):(\d+)\s*(.*)$')
    
    with zipfile.ZipFile(zip_path, 'r') as zf:
        for file_info in zf.infolist():
            # 디렉토리는 건너뜀
            if file_info.is_dir():
                continue
                
            filename = file_info.filename
            
            # 깨진 zip 파일명을 cp949 한글로 복원하여 구약/신약 폴더명 분리 감지
            try:
                decoded_filename = filename.encode('cp437').decode('cp949')
            except Exception:
                decoded_filename = filename
                
            basename = os.path.basename(decoded_filename)
            is_new_testament = "신약" in decoded_filename
            
            # 파일명 앞자리 숫자 패턴 (예: "01 창세기.txt") 추출
            num_match = re.match(r'^(\d+)', basename)
            if not num_match:
                continue
                
            book_num = int(num_match.group(1))
            if is_new_testament:
                book_num += 39
                
            if book_num not in BIBLE_BOOKS:
                continue
                
            book_name = BIBLE_BOOKS[book_num]
            
            try:
                # 파일 내용 읽기
                with zf.open(file_info) as f:
                    content_bytes = f.read()
                    # euc-kr 또는 cp949 디코딩
                    content_str = content_bytes.decode('cp949', errors='ignore')
                    
                    for line in content_str.splitlines():
                        line = line.strip()
                        if not line:
                            continue
                            
                        match = line_pattern.match(line)
                        if not match:
                            continue
                            
                        chapter = int(match.group(2))
                        verse = int(match.group(3))
                        text = match.group(4).strip()
                        
                        # 영문 번역 데이터 내의 닫는 괄호 LORD] 오염 찌꺼기 정제
                        text = text.replace("LORD]", "LORD")
                        
                        if chapter == 0 or verse == 0:
                            continue
                            
                        ch_str = str(chapter)
                        if ch_str not in bible_data[book_name]:
                            bible_data[book_name][ch_str] = []
                            
                        verse_list = bible_data[book_name][ch_str]
                        
                        target_idx = verse - 1
                        while len(verse_list) < target_idx:
                            verse_list.append("")
                            
                        if len(verse_list) == target_idx:
                            verse_list.append(text)
                        else:
                            verse_list[target_idx] = text
            except Exception as e:
                print(f"Error parsing file {filename} in zip: {e}")

    # JS 파일로 쓰기
    os.makedirs(os.path.dirname(output_js_path), exist_ok=True)
    with open(output_js_path, 'w', encoding='utf-8') as out:
        out.write(f"window.{var_name} = ")
        json.dump(bible_data, out, ensure_ascii=False, indent=2)
        out.write(";\n")
    print(f"Saved to {output_js_path}")

if __name__ == "__main__":
    # 경로 설정
    base_txt_dir = r"d:\F\로그인처치\성경txt"
    output_dir = r"d:\F\로그인처치\개인성경앱\bible_data"
    
    # 변환할 파일 리스트와 출력명 정의
    targets = [
        ("현대인의_성경.txt", "bible_db_hyundai.js", "BIBLE_DB_HYUNDAI"),
        ("New_Revised_Standard_VersionNIV 영어 텍스트.txt", "bible_db_niv.js", "BIBLE_DB_NIV"),
        ("New_Living_Translation  NLT 영어 텍스트.txt", "bible_db_nlt.js", "BIBLE_DB_NLT"),
        ("New_King_James_Version뉴킹제임스 영어 텍스트.txt", "bible_db_nkjv.js", "BIBLE_DB_NKJV"),
        ("Revised__Standard_Version  RSV 영어텍스트 (1).txt", "bible_db_rsv.js", "BIBLE_DB_RSV"),
    ]
    
    # 1. 단일 텍스트 파일 변환 실행
    for src_file, out_file, var_name in targets:
        src_path = os.path.join(base_txt_dir, src_file)
        out_path = os.path.join(output_dir, out_file)
        if os.path.exists(src_path):
            parse_single_file(src_path, out_path, var_name)
        else:
            print(f"File not found: {src_path}")
            
    # 2. ZIP 파일(쉬운성경) 변환 실행
    zip_src = os.path.join(base_txt_dir, "쉬운성경-텍스트.zip")
    zip_out = os.path.join(output_dir, "bible_db_easy.js")
    if os.path.exists(zip_src):
        parse_zip_file(zip_src, zip_out, "BIBLE_DB_EASY")
    else:
        print(f"Zip file not found: {zip_src}")

    print("All transformations complete.")
