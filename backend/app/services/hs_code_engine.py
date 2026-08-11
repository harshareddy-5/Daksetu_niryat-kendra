import json
import os
import re
from typing import Dict, Any, List
from app.config import settings

class HsCodeEngineService:
    def __init__(self):
        self.hs_db_file = os.path.join(settings.DATA_DIR, "hs_codes_db.json")
        self.hs_database = []
        self._load_database()

    def _load_database(self):
        if os.path.exists(self.hs_db_file):
            try:
                with open(self.hs_db_file, "r", encoding="utf-8") as f:
                    self.hs_database = json.load(f)
            except Exception as e:
                print(f"Error loading hs_codes_db.json: {e}")

    def find_hs_candidates(self, category: str, craft_name: str, materials: List[str], target_code: str = None) -> List[Dict[str, Any]]:
        """
        Rank HS Codes based on craft name, category, materials, and target code.
        """
        candidates = []
        query_text = f"{category} {craft_name} {' '.join(materials)}".lower()

        for item in self.hs_database:
            score = 0.50

            if target_code and item.get("hs_code") == target_code:
                score = 0.98
            elif craft_name.lower() in item.get("title", "").lower() or craft_name.lower() in item.get("description", "").lower():
                score = 0.95
            else:
                keywords = item.get("keywords", [])
                match_count = sum(1 for kw in keywords if kw.lower() in query_text)
                if match_count > 0:
                    score = min(0.92, 0.65 + (match_count * 0.10))
                elif item.get("category", "").lower() == category.lower():
                    score = 0.72

            reasoning = self._generate_reasoning(item, craft_name, materials, score)

            candidate = {
                "hs_code": item.get("hs_code"),
                "chapter": item.get("chapter"),
                "heading": item.get("heading"),
                "title": item.get("title"),
                "description": item.get("description"),
                "confidence": round(score, 2),
                "gst_rate": item.get("gst_rate", 12.0),
                "basic_customs_duty": item.get("basic_customs_duty", 0.0),
                "rodtep_rate": item.get("rodtep_rate", 2.5),
                "duty_drawback_rate": item.get("duty_drawback_rate", 1.8),
                "export_policy": item.get("export_policy", "Free"),
                "reasoning": reasoning,
                "restrictions": item.get("restrictions", [])
            }
            candidates.append(candidate)

        # Sort by confidence descending
        candidates.sort(key=lambda x: x["confidence"], reverse=True)
        return candidates[:4]

    def _generate_reasoning(self, item: Dict[str, Any], craft_name: str, materials: List[str], score: float) -> str:
        code = item.get("hs_code")
        title = item.get("title")
        rodtep = item.get("rodtep_rate")
        return (
            f"Classified under Chapter {item.get('chapter')} (Heading {item.get('heading')}) as '{title}'. "
            f"Matches artisan material ({', '.join(materials[:2]) if materials else 'Handicraft'}). "
            f"Export policy is Free with {rodtep}% RoDTEP incentive benefits under India Post DNK."
        )

hs_engine = HsCodeEngineService()
