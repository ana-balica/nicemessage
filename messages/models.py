from django.db import models


class Message(models.Model):
    """Nice message from an anonymous user"""
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField(unpack_ipv4=True)
