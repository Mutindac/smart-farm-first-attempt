from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from .models import Field
from .serializers import FieldSerializer, CreateFieldSerializer
from accounts.permisions import IsAdmin, IsAgent

#create field
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def create_field(request):
    serializer = CreateFieldSerializer(data=request.data)
    if serializer.is_valid():
        field = serializer.save()
        return Response(FieldSerializer(field).data, status=201)
    return Response(serializer.errors, status=400)

#list fields
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def list_fields(request):
    fields = Field.objects.all()
    serializer = FieldSerializer(fields, many=True)
    return Response(serializer.data)

#get my assigned fields
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAgent])
def my_fields(request):
    fields = Field.objects.filter(assigned_agent=request.user)
    serializer = FieldSerializer(fields, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAgent])
def update_field(request, pk):
    try:
        field = Field.objects.get(id=pk, assigned_agent=request.user)
    except Field.DoesNotExist:
        return Response({"error": "Field not found"}, status=404)

    serializer = CreateFieldSerializer(field, data=request.data, partial=True)

    if serializer.is_valid():
        field = serializer.save()
        return Response(FieldSerializer(field).data)

    return Response(serializer.errors, status=400)


#admin fields view
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_fields(request):
    fields = Field.objects.all()
    serializer = FieldSerializer(fields, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdmin])
def delete_field(request, pk):
    try:
        field = Field.objects.get(id=pk)
    except Field.DoesNotExist:
        return Response({"error": "Field not found"}, status=404)

    field.delete()
    return Response({"message": "Field deleted successfully"}, status=200)