from rest_framework import serializers
from .models import Field
from accounts.serializers import UserSerializer
from accounts.models import User

class FieldSerializer(serializers.ModelSerializer):
    assigned_agent = UserSerializer(read_only=True)

    class Meta:
        model = Field
        fields = '__all__'
    
class CreateFieldSerializer(serializers.ModelSerializer):
    assigned_agent = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='AGENT'), required=False, allow_null=True)
    
    class Meta:
        model = Field
        fields = ['name', 'assigned_agent', 'crop_type', 'current_stage', 'planting_date']
        
    def validate_assigned_agent(self, value):
        if value and value.role != 'AGENT':
            raise serializers.ValidationError("Assigned agent must have the role 'AGENT'.")
        return value
    
    