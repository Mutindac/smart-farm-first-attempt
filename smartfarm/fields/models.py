from django.db import models
from accounts.models import User
from datetime import date

class Field(models.Model):
    STAGE_CHOICES = (
        ('PLANTED', 'Planted'),
        ('GROWING', 'Growing'),
        ('READY', 'Ready'),
        ('HARVESTED', 'Harvested'),
    )
    
    name = models.CharField(max_length=255)
    crop_type = models.CharField(max_length=255)
    current_stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='PLANTED')
    planting_date = models.DateField()
    assigned_agent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='fields')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    

def get_status(self):
    if self.current_stage == 'HARVESTED':
        return "Completed"

    if self.notes:
        risk_keywords = ["pest", "insect", "disease", "dry", "fungus", "wilt", "rot"]

        if any(word in self.notes.lower() for word in risk_keywords):
            return "At Risk"

    days_since_update = (date.today() - self.updated_at.date()).days

    if days_since_update > 5:
        return "At Risk"

    return "Active"