from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import renderers

from common.views import IndexView
from messages.views import MessageViewSet


messages_list = MessageViewSet.as_view({
    'get': 'list',
    'post': 'create'
    })


urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name="index"),
    url(r'^api/v1/messages/$', messages_list, name='messages-list'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
        namespace='rest_framework'))
)
