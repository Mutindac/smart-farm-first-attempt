from django.contrib import admin
from .models import FieldUpdate

@admin.register(FieldUpdate)
class FieldUpdateAdmin(admin.ModelAdmin):
    list_display = ('field', 'agent', 'stage', 'created_at')
    list_filter = ('stage', 'created_at')
    search_fields = ('field__name', 'agent__username', 'notes')
    ordering = ('-created_at',)