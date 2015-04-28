from rest_framework import viewsets

from messages.models import Message
from messages.serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-timestamp')[:50]
    serializer_class = MessageSerializer
