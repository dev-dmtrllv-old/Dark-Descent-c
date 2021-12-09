using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using UnityEngine;

namespace DarkDescent
{
	public class SocketManager
	{
		public static SocketManager Instance { get; private set; } = new SocketManager();

		private TcpClient socketConnection;
		private Thread clientReceiveThread;

		private SocketManager()
		{
			
		}

		public bool Connect()
		{
			try
			{
				clientReceiveThread = new Thread(new ThreadStart(ThreadEntry));
				clientReceiveThread.IsBackground = true;
				clientReceiveThread.Start();
			}
			catch (Exception e)
			{
				Debug.Log("On client connect exception " + e);
			}
			return false;
		}

		private void ThreadEntry()
		{
			try
			{
				socketConnection = new TcpClient("localhost", 8052);
				Byte[] bytes = new Byte[1024];
				while (true)
				{			
					using (NetworkStream stream = socketConnection.GetStream())
					{
						int length;
						while ((length = stream.Read(bytes, 0, bytes.Length)) != 0)
						{
							var incommingData = new byte[length];
							Array.Copy(bytes, 0, incommingData, 0, length);				
							string serverMessage = Encoding.ASCII.GetString(incommingData);
							Debug.Log("server message received as: " + serverMessage);
						}
					}
				}
			}
			catch (SocketException socketException)
			{
				Debug.Log("Socket exception: " + socketException);
			}
		}

		public void Send(string msg)
		{
			if (socketConnection == null)
			{
				return;
			}
			try
			{
				NetworkStream stream = socketConnection.GetStream();
				if (stream.CanWrite)
				{
					byte[] byteMsg = Encoding.ASCII.GetBytes(msg);
					stream.Write(byteMsg, 0, byteMsg.Length);
					Debug.Log("Client sent his message - should be received by server");
				}
			}
			catch (SocketException socketException)
			{
				Debug.Log("Socket exception: " + socketException);
			}
		}


	}
}
