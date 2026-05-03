from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import FieldUpdate
from fields.models import Field
from .serializers import FieldUpdateSerializer
from accounts.permisions import IsAdmin, IsAgent


#create update
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAgent])
def create_update(request):
    serializer = FieldUpdateSerializer(data=request.data)

    if serializer.is_valid():
        field = serializer.validated_data['field']

        # ensure agent owns field
        if field.assigned_agent != request.user:
            return Response({'error': 'Not your field'}, status=403)

        update = serializer.save(agent=request.user)

        # update field stage
        field.current_stage = update.stage
        field.save()

        return Response(FieldUpdateSerializer(update).data, status=201)

    return Response(serializer.errors, status=400)

#get field history
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def field_updates(request, field_id):
    updates = FieldUpdate.objects.filter(field_id=field_id).order_by('-created_at')
    serializer = FieldUpdateSerializer(updates, many=True)
    return Response(serializer.data)