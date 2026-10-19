from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .permissions import IsShoppingListOwnerOrReadOnly
from .models import ShoppingList, Item
from .serializers import ShoppingListSerializer, ItemSerializer


class ShoppingListViewSet(viewsets.ModelViewSet):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer
    permission_classes = [IsAuthenticated, IsShoppingListOwnerOrReadOnly]

    def get_queryset(self):
        return ShoppingList.objects.filter(users=self.request.user)

    def perform_create(self, serializer):
        shopping_list = serializer.save(owner=self.request.user)
        shopping_list.users.add(self.request.user)

    @action(detail=True, methods=['post'])  # ← das hat gefehlt!
    def add_user(self, request, pk=None):
        shopping_list = self.get_object()
        username = request.data.get('username')
        try:
            user = User.objects.get(username=username)
            shopping_list.users.add(user)
            return Response({'status': f'{username} hinzugefügt'})
        except User.DoesNotExist:
            return Response({'error': 'User nicht gefunden'}, status=404)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(
            shopping_list__users=self.request.user
        )

    def perform_create(self, serializer):
        shopping_list = serializer.validated_data['shopping_list']

        if self.request.user not in shopping_list.users.all():
            raise PermissionDenied("Not your list")

        serializer.save()
