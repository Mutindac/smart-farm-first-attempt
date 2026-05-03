from django.db import models
from accounts.models import User
from fields.models import Field

class FieldUpdate(models.Model):
    STAGE_CHOICES = (
        ('PLANTED', 'Planted'),
        ('GROWING', 'Growing'),
        ('READY', 'Ready'),
        ('HARVESTED', 'Harvested'),
    )
    
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name='updates')
    agent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='field_updates')
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.stage} - {self.field.name} - {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"
