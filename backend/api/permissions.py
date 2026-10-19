from rest_framework.permissions import BasePermission


class IsShoppingListOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):

        # GET, HEAD, OPTIONS
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return obj.users.filter(id=request.user.id).exists()

        # PUT, PATCH, DELETE
        return obj.owner == request.user