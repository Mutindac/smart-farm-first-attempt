from django.contrib import admin
from .models import Field


class FieldAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'crop_type',
        'planting_date',
        'current_stage',
        'assigned_agent'
    ]

    list_filter = [
        'current_stage',
        'crop_type',
        'assigned_agent'
    ]

admin.site.register(Field, FieldAdmin)