from rest_framework import serializers
from .models import FieldUpdate
from accounts.models import User

class FieldUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldUpdate
        fields = '__all__'
        read_only_fields = ['agent', 'created_at']
    
    def validate_agent(self, value):
        if value and value.role != 'AGENT':
            raise serializers.ValidationError("Agent must have the role 'AGENT'.")
        return value
    def validate_stage(self, value):
        valid_stages = ['PLANTED', 'GROWING', 'READY', 'HARVESTED']
        if value not in valid_stages:
            raise serializers.ValidationError(f"Stage must be one of {valid_stages}.")
        return value