from bson import ObjectId
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from api.authentication import JWTAuthentication
from api .mongo_db import *
from django.utils import timezone


# Create your views here.
class UserDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:

            user = request.user

            return Response({
                "id": user.id,
                "name": user.full_name,
                "picture": user.profile_picture,
                "provider": user.auth_provider,
                "email_hash": user.email_hash,
            })
        except Exception as e:
            print(f"Error fetching user details: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# create document and view documents using this api
class DocumentView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    print('called document api')

    def post(self, request):
        try:
            data = {
                "title": "Untitled Document",
                "content": "",
                "owner_id": ObjectId(request.user.id),
                "owner_name": request.user.full_name,

                "is_deleted": False,
                "deleted_at": None,

                "is_starred": False,

                "created_at": timezone.now(),
                "updated_at": timezone.now(),
            }

            result = users_documents_collection.insert_one(data)

            return Response({
                "document_id": str(result.inserted_id)
            })
        except Exception as e:
            print(f"Error creating document: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def get(self, request):
        try:
            docs = list(
                users_documents_collection.find(
                    {"owner_id": ObjectId(request.user.id),
                     "is_deleted": False}
                )
            )

            for doc in docs:
                doc["_id"] = str(doc["_id"])   
                doc["owner_id"] = str(doc["owner_id"])       

            return Response(docs)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DocumentDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, document_id):
        try:
            doc = users_documents_collection.find_one(
                {
                    "_id": ObjectId(document_id),   
                    "owner_id": ObjectId(request.user.id)
                }
            )
            if not doc:
                return Response({"error": "Document not found"}, status=status.HTTP_404_NOT_FOUND)
            doc["_id"] = str(doc["_id"])
            doc["owner_id"] = str(doc["owner_id"])
            return Response(doc)
        except Exception as e:
            print(f"Error fetching document details: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    #for updating document content ,title and soft delete of document
    def put(self, request, document_id):
        try:
            data = request.data
            update_data = {
                "updated_at": timezone.now()
            }

            if "content" in data:
                update_data["content"] = data["content"]

            if "title" in data:
                update_data["title"] = data["title"]

            if "is_deleted" in data:
                update_data["is_deleted"] = data["is_deleted"]
                update_data["deleted_at"] = (
                    timezone.now()
                    if data["is_deleted"]
                    else None
                )
            
            if "is_starred" in data:
                update_data["is_starred"] = data["is_starred"]
            
            if len(update_data) == 1:
                return Response(
                    {"error": "No valid fields provided"},
                    status=status.HTTP_400_BAD_REQUEST
                )


            result = users_documents_collection.update_one(
                {
                    "_id": ObjectId(document_id),
                    "owner_id": ObjectId(request.user.id)
                },
                {
                    "$set": update_data
                }
            )
            if result.matched_count == 0:
                return Response({"error": "Document not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response({"message": "Document updated successfully"})
        except Exception as e:
            print(f"Error updating document: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    #for permanent deletion of document
    def delete(self, request, document_id):
        try:
            print('called delete api for document_id:', document_id)
            users_documents_collection.delete_one(
                {
                    "_id": ObjectId(document_id),
                    "owner_id": ObjectId(request.user.id)
                }
            )

            return Response({
                "message": "Deleted permanently"
            })
        except Exception as e:
            print(f"Error deleting document: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 


class TrashView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            trashed_docs = list(
                users_documents_collection.find(
                    {
                        "owner_id": ObjectId(request.user.id),
                        "is_deleted": True
                    }
                )
            )
            print(trashed_docs,'temp')

            for doc in trashed_docs:
                doc["_id"] = str(doc["_id"])
                doc["owner_id"] = str(doc["owner_id"])

            return Response(trashed_docs)
        except Exception as e:
            print(f"Error fetching trashed documents: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   


class StarredDocumentsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            docs = list(
                users_documents_collection.find(
                    {
                        "owner_id": ObjectId(request.user.id),
                        "is_starred": True,
                        "is_deleted": {
                            "$ne": True
                        }
                    }
                ).sort("updated_at", -1)
            )

            for doc in docs:
                doc["_id"] = str(doc["_id"])
                doc["owner_id"] = str(doc["owner_id"])

            return Response(docs)
        except Exception as e:
            print(f"Error fetching starred documents: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RecentDocumentsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        docs = list(
            users_documents_collection.find(
                {
                    "owner_id": ObjectId(request.user.id),
                    "is_deleted": {
                        "$ne": True
                    }
                }
            ).sort(
                "updated_at",
                -1
            )
        )

        for doc in docs:
            doc["_id"] = str(doc["_id"])
            doc["owner_id"] = str(doc["owner_id"])

        return Response(docs)
    
    