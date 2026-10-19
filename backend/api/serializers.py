from rest_framework import serializers
from .models import ShoppingList, Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'completed', 'created_at', 'shopping_list']


class ShoppingListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = ShoppingList
        fields = ['id', 'name', "owner", 'items', 'created_at', 'users']
