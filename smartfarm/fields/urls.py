from django.urls import path
from .views import create_field, list_fields, my_fields, update_field, admin_fields,delete_field

urlpatterns = [
    path('create/', create_field, name='create_field'),
    path('list/', list_fields, name='list_fields'),
    path('my-fields/', my_fields, name='my_fields'),
    path('admin-fields/', admin_fields, name='admin_fields'),
    path('update/<int:pk>/', update_field, name='update_field'),
    path('delete/<int:pk>/', delete_field, name='delete_field'),
]