from django.contrib import admin
from .models import ShoppingList, Item


class ItemInline(admin.TabularInline):
    model = Item
    extra = 1


@admin.register(ShoppingList)
class ShoppingListAdmin(admin.ModelAdmin):
    inlines = [ItemInline]


admin.site.register(Item)
