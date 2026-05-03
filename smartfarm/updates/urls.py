from django.urls import path
from .views import create_update, field_updates

urlpatterns = [
    path('create/', create_update, name='create_update'),
    path('<int:field_id>/', field_updates, name='field_updates'),
    ]