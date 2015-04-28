from rest_framework import serializers

from messages.models import Message


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = ('body', 'ip')
